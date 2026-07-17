# Design

## Purpose

This repo hosts reusable GitHub Actions workflows (`workflow_call`) consumed by other `homelab-ops`/`ppat`
repositories for linting, testing, building, and releasing. Workflows live here — rather than duplicated
inline in every consuming repo — so the CI/CD logic itself can be versioned, pinned by tag or SHA, and
changed in one place.

See [README.md](README.md) for what each workflow does and how to call one from a consuming repo, and
[CLAUDE.md](CLAUDE.md) for repo layout when working with Claude Code.

## Conventions used by the workflows themselves

- Every workflow in `.github/workflows/*.yaml` is a single `on: workflow_call` job graph — no composite
  actions, no shared scripts outside the workflow file. Anything that needs checking out a repo and
  installing a toolchain calls
  [`ppat/homelab-ops-actions`](https://github.com/ppat/homelab-ops-actions)'s
  `actions/setup-repository-tools@<pinned-sha>` (that action lives in a separate repo specifically so both
  `github-workflows` and its consumers can use the same checkout/`mise`-install/cache logic).
- Tool versions needed inside a workflow's `run:` steps are pinned as workflow `env:` values with a
  `# renovate: datasource=... depName=...` comment directly above, driving the custom regex manager in
  `.github/renovate.json`. This is what lets Renovate bump a version embedded in shell/YAML instead of a
  lockfile entry. No reusable workflow exposes a tool-version override as a `workflow_call` input — see
  "Tool versions are centralized" below for why.
- Third-party Actions (`actions/checkout`, `docker/build-push-action`, etc.) are pinned to a commit SHA
  with the version as a trailing comment, per this repo's own `helpers:pinGitHubActionDigests` /
  `docker:pinDigests` Renovate presets.
- `detect-changed-files.yaml` exists so consumers (including this repo's own `self-lint.yaml`) can gate
  expensive lint jobs on `paths` actually changed in a PR, via
  [`tj-actions/changed-files`](https://github.com/tj-actions/changed-files), rather than running every
  linter on every PR regardless of what changed.
- `zizmor.yaml` findings already present when the zizmor gate (`lint-zizmor.yaml`) was introduced are
  tracked as accepted risk in `zizmor.yaml` (the config file, not the workflow) rather than fixed
  retroactively — see the comment at the top of that file for the reasoning per finding.

## Tool versions are centralized, not overridden by consumers

No reusable workflow exposes a dedicated per-call tool-version input (e.g. there is no `yamllint_version:`
input on `lint-yaml.yaml`). Versions default from this repo's own Renovate-tracked `env:` values, passed
into `setup-repository-tools`' `mise_toml:` input. A consuming repo's own workflow that calls
`uses: ppat/github-workflows/.github/workflows/lint-yaml.yaml@<sha>` has that `<sha>` tracked by Renovate
too (via `helpers:pinGitHubActionDigests`), so a version bump merged here eventually reaches every consumer
as a routine Renovate PR bumping their pinned SHA — no per-repo action needed.

Consumers *can* still override a version without any workflow-side input: `mise` (via `jdx/mise-action`
inside `setup-repository-tools`) auto-discovers and merges any `mise.toml`-style config file anywhere in
the checked-out repo tree, not just at its root, so a consumer only needs to commit their own `mise.toml`
(e.g. pinning `yamllint` to an older version) for it to take effect on top of the workflow's inline
`mise_toml:` defaults. `mise_ignore_cfg` exists on every reusable workflow specifically to suppress that
auto-discovery for a given path, when a consumer's own committed mise config would otherwise interfere
with a reusable workflow that expects to fully control its own toolchain. In practice this override path is
rare — most consumers take the default version and let Renovate carry it forward — but it is a real,
supported mechanism, not a gap.

## Dogfooding: `self-*.yaml`

Every reusable workflow that has runtime behavior worth exercising has a matching `self-*.yaml` in
`.github/workflows/` that calls it directly against this repo's own files or the fixtures in `test/`:

- `self-lint.yaml` calls the `lint-*.yaml` workflows (gated by `detect-changed-files.yaml`) against this
  repo's own workflow/markdown/YAML/renovate-config files, on every PR plus a weekly schedule.
- `self-test-docker.yaml`, `self-test-chainsaw.yaml`, `self-test-terraform.yaml`, `self-test-shellcheck.yaml`,
  `self-test-aqua.yaml`, `self-test-semantic-release.yaml` each call one workflow against a fixture tree
  under `test/<name>/`, triggered by `pull_request.paths` scoped to that workflow + its fixtures, a weekly
  `schedule`, and `workflow_dispatch`. The weekly run exists to catch upstream drift (a new tool release, an
  external API change) between PRs that would otherwise go unnoticed until the next unrelated change to
  that workflow.
- `self-release-please.yaml` and `self-renovate.yaml` wire this repo's own release and dependency-update
  automation — see below. They are not "tests"; they're this repo consuming its own reusable workflows for
  its own repo lifecycle.

When adding a new reusable workflow with meaningful runtime behavior, add a matching `self-test-<name>.yaml`
and fixtures under `test/<name>/` rather than relying on manual verification.

## Release & versioning

This repo offers **two independent release mechanisms** as reusable workflows, both read conventional-commit
history, and both remain actively maintained here — this is a deliberate, unhurried mid-migration state, not
an oversight:

- `release-please.yaml` wraps
  [`googleapis/release-please-action`](https://github.com/googleapis/release-please-action): PR-based —
  commits land on a standing release PR that captures the pending changelog/version bump, and merging that
  PR is what cuts the release. Signed commits are the default behavior, not a workaround. It also natively
  supports monorepos, including both same-version-across-all-components and independently-versioned
  components, which `semantic-release` has no real equivalent for. This repo releases **itself** this way —
  `self-release-please.yaml` runs it on every push to `main`, driven by `release-please-config.json` /
  `.release-please-manifest.json`.
- `release-semantic.yaml` wraps
  [`semantic-release`](https://github.com/semantic-release/semantic-release) (config in `.releaserc.js`,
  dependencies in `package.json`/`bun.lock`): commit-driven, releases immediately on `workflow_dispatch`
  without a batching PR, and needs a convoluted plugin workaround to produce a signed commit at all. This
  repo does **not** use this workflow for its own releases — `self-test-semantic-release.yaml` only dry-runs
  it on PRs that touch the workflow or its config, to confirm it still works for consumers who use it as
  their primary release mechanism.

Newer repos in this org default to `release-please`; most older repos still use `release-semantic` and
haven't been migrated. That migration is intentionally not being rushed: `release-please` is the better fit
on features (see above), but `semantic-release` has the larger community, and `release-please` being a
Google product carries its own risk — Google has a track record of discontinuing tools with little notice,
leaving adopters to deal with the fallout. Both workflows are kept working and tested (`self-*`/`self-test-*`
above) rather than one being left to bit-rot in favor of the other. Don't take on a wholesale migration of
consumer repos from one to the other without being asked — pick whichever mechanism a given repo already
uses, or ask, rather than assuming `release-please` is always the right default going forward.

Commit messages are enforced by commitlint (`commitlint.config.js`, scopes limited to
`dev-tools`/`github-actions`/`release`/`renovate`/empty) via `lint-commit-messages.yaml`. `CHANGELOG.md` and
version numbers are fully automated by whichever mechanism a repo uses — don't hand-edit either.

## Dependency updates

`renovate.yaml` wraps [`renovatebot/github-action`](https://github.com/renovatebot/github-action) as a
reusable workflow for consumers. This repo also consumes it on itself via `self-renovate.yaml` (daily
schedule, dry-run on PRs touching the workflow), using `.github/renovate.json`, which extends shared
presets from [`ppat/renovate-presets`](https://github.com/ppat/renovate-presets) plus three local overlay
files: `.github/renovate/group.json` (groups related npm packages into one PR),
`.github/renovate/release-age.json` (minimum release age before some major/minor bumps are opened), and
`.github/renovate/exceptions.json` (version ceilings for tools with known compatibility constraints, each
with a `description` explaining why).

`update-aqua-checksums.yaml` is a separate reusable workflow (not part of the Renovate config) that keeps
`aqua-checksum.json` lockfiles current for repos using [`aqua`](https://aquaproj.github.io/) as a tool
installer — Renovate bumps the version in `aqua.yaml`, this workflow recomputes the checksums and pushes a
signed commit via `ppat/homelab-ops-actions`'s `actions/create-signed-commit`.
