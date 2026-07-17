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

No build step. `pre-commit` (yamllint, markdownlint-cli2, shellcheck, commitlint) is the primary local
tooling:

```bash
pre-commit install
pre-commit run --all-files
pre-commit run yamllint --all-files
pre-commit run shellcheck --all-files
pre-commit run markdownlint-cli2 --all-files
```

Lint a commit message locally:

```bash
echo "fix(github-actions): pin actions/checkout to v7" | npx commitlint
```

`bun install` is only needed if changing `package.json`/`.releaserc.js` (semantic-release deps); it is not
required to edit or lint workflow YAML.

There is no way to run a `workflow_call` workflow locally — to exercise one's actual runtime behavior,
push a branch/PR that touches it (or its `test/<name>/` fixtures), which triggers the matching
`self-test-<name>.yaml` in GitHub Actions. These also run weekly and via `workflow_dispatch`, so a
passing run days ago doesn't guarantee the workflow still works against current upstream tool versions.

## Working in this repo

- Every reusable workflow takes `git_ref` (or `source_git_ref`) as an explicit input rather than assuming
  `github.ref` — this is what lets `self-test-*.yaml` call a workflow against a PR branch instead of
  `main`. When adding a new workflow, follow this pattern rather than reading `github.ref` directly inside
  the called workflow.
- When changing a reusable workflow's inputs, outputs, or secrets, update its matching table row in
  [README.md](README.md) in the same change — README is the interface contract consumers read before
  wiring a `with:`/`secrets:` block, not just a summary.
- If a workflow's runtime behavior changed (not just its `with:`/`secrets:` surface), check whether a
  matching `self-test-<name>.yaml` + `test/<name>/` fixture exists and update it rather than relying on
  manual verification — see [DESIGN.md](DESIGN.md) for the dogfooding pattern this repo uses.
- Any tool version embedded in a workflow's `env:` (not a lockfile) needs a
  `# renovate: datasource=... depName=...` comment above it so Renovate's custom regex manager can track
  it — copy the pattern from an existing workflow (e.g. `HADOLINT_VERSION` in `lint-hadolint.yaml`) rather
  than inventing a new comment format.
- Pin any new third-party Action reference to a commit SHA with the version as a trailing comment
  (`uses: owner/repo@<sha> # vX.Y.Z`).
- Commit messages must pass commitlint: conventional-commit format, scope must be one of `dev-tools`,
  `github-actions`, `release`, `renovate`, or empty, header ≤120 chars. `CHANGELOG.md` and version numbers
  are otherwise fully automated by release-please (this repo's own release mechanism, see
  [DESIGN.md](DESIGN.md)) — don't hand-edit either.
- This repo offers both `release-please.yaml` and `release-semantic.yaml` as reusable workflows for
  consumers to pick one from, but only dogfoods `release-please` on itself. Don't assume the two are
  interchangeable or that a change to one should mirror in the other — they're deliberately separate
  mechanisms for consumers with different preferences.
