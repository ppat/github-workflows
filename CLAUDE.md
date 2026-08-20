# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See [README.md](README.md) for what each workflow does and how to call one from a consuming repo, and
[DESIGN.md](DESIGN.md) for conventions and how release/renovate/testing fit together.

## Repo layout

- `.github/workflows/*.yaml` — the reusable workflows themselves (`on: workflow_call`), one per file,
  e.g. `lint-yaml.yaml`, `build-docker-image.yaml`, `release-please.yaml`. These are the product of this
  repo; everything else supports or exercises them.
- `.github/workflows/self-*.yaml` — this repo consuming its own reusable workflows, either as tests
  against fixtures in `test/`, or as this repo's actual lint/release/renovate CI. See
  [DESIGN.md](DESIGN.md) for which is which.
- `test/<name>/` — fixtures for the matching `self-test-<name>.yaml` (e.g. `test/docker/Dockerfile`,
  `test/terraform/*.tf`, `test/chainsaw/*.yaml`).
- `.github/renovate.json` + `.github/renovate/*.json` — this repo's own Renovate config (also a template
  for consumers).
- `.releaserc.js`, `package.json`, `bun.lock` — config/deps for `release-semantic.yaml`, checked out by
  consumers of that workflow that don't have their own (see the `Install node packages` step in
  `release-semantic.yaml` and `lint-commit-messages.yaml`).
- `release-please-config.json`, `.release-please-manifest.json` — config for `release-please.yaml`, used
  both by consumers and by this repo's own `self-release-please.yaml`.
- `zizmor.yaml` — accepted-risk findings for the `lint-zizmor.yaml` gate (see comment in the file).

## Commands

No build step. `pre-commit` (yamllint, markdownlint-cli2, commitlint) is the primary local tooling:

```bash
pre-commit install
pre-commit run --all-files
pre-commit run yamllint --all-files
pre-commit run markdownlint-cli2 --all-files
```

`shellcheck` is not a pre-commit hook; it runs only in CI, from two independent places:

```bash
# standalone scripts, as lint-shellcheck.yaml runs them (honours .shellcheckrc)
shellcheck --rcfile .shellcheckrc <file>...

# workflow `run:` blocks, as lint-github-actions.yaml runs them
actionlint -shellcheck shellcheck
```

actionlint always appends `--norc` to the shellcheck command it invokes, so `.shellcheckrc` does
**not** apply to `run:` blocks — suppress those findings with an inline `# shellcheck disable=SCxxxx`
comment at the occurrence, never with a repo-wide disable.

Lint a commit message locally:

```bash
echo "fix(github-actions): re-pin actions/checkout to its current major" | npx commitlint
```

`bun install` is only needed if changing `package.json`/`.releaserc.js` (semantic-release deps); it is not
required to edit or lint workflow YAML.

There is no way to run a `workflow_call` workflow locally — to exercise one's actual runtime behavior,
push a branch/PR that touches it (or its `test/<name>/` fixtures), which triggers the matching
`self-test-<name>.yaml` in GitHub Actions. These also run weekly and via `workflow_dispatch`, so a
passing run days ago doesn't guarantee the workflow still works against current upstream tool versions.

## Commit types and scopes

The full taxonomy lives in [.claude/rules/commits.md](.claude/rules/commits.md) — read it before writing
a commit message or a PR title. In short: **type** answers *what kind of change*, **scope** answers *which
maintenance surface*, and the split between them turns on one question — does the thing you changed reach
a consumer, or only this repo's own CI? commitlint enforces both the scope list and the rule that a type
claiming shipped behaviour cannot sit on a scope that never ships.

This matters more than it looks: release-please derives the version bump and the changelog from the
header, and squash-merge means the **PR title** is the released commit on a multi-commit branch.

## Working in this repo

- Every reusable workflow takes `git_ref` (or `source_git_ref`) as an explicit input rather than assuming
  `github.ref` — this is what lets `self-test-*.yaml` call a workflow against a PR branch instead of
  `main`. When adding a new workflow, follow this pattern rather than reading `github.ref` directly inside
  the called workflow.
- When changing a reusable workflow's inputs, outputs, or secrets, update its matching table row in
  [README.md](README.md) in the same change — README is the interface contract consumers read before
  wiring a `with:`/`secrets:` block, not just a summary.
- An input's **default** is part of that interface too. Change one only for consumers' sake, never to suit
  this repo — override it at the call site instead, as `self-test-aqua.yaml` does for
  `update-aqua-checksums.yaml`'s `semantic_commit_scope`. Changing a default is a breaking change and
  belongs with a coordinated rollout.
- An input's **default** is part of that interface too. Change one only for consumers' sake, never to suit
  this repo — override it at the call site instead, as `self-test-aqua.yaml` does for
  `update-aqua-checksums.yaml`'s `semantic_commit_scope`. Changing a default is a breaking change and
  belongs with a coordinated rollout.
- If a workflow's runtime behavior changed (not just its `with:`/`secrets:` surface), check whether a
  matching `self-test-<name>.yaml` + `test/<name>/` fixture exists and update it rather than relying on
  manual verification — see [DESIGN.md](DESIGN.md) for the dogfooding pattern this repo uses.
- Any tool version embedded in a workflow's `env:` (not a lockfile) needs a
  `# renovate: datasource=... depName=...` comment above it so Renovate's custom regex manager can track
  it — copy the pattern from an existing workflow (e.g. `HADOLINT_VERSION` in `lint-hadolint.yaml`) rather
  than inventing a new comment format.
- Pin any new third-party Action reference to a commit SHA with the version as a trailing comment
  (`uses: owner/repo@<sha> # vX.Y.Z`).
- Commit messages must pass commitlint (header ≤120 chars) — see
  [.claude/rules/commits.md](.claude/rules/commits.md) for which type/scope to pick. `CHANGELOG.md` and version numbers are fully automated by release-please (this
  repo's own release mechanism, see [DESIGN.md](DESIGN.md)) — don't hand-edit either.
- This repo offers both `release-please.yaml` and `release-semantic.yaml` as reusable workflows for
  consumers to pick one from, but only dogfoods `release-please` on itself. Don't assume the two are
  interchangeable or that a change to one should mirror in the other — they're deliberately separate
  mechanisms for consumers with different preferences.
