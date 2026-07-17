# github-workflows

Reusable [GitHub Actions `workflow_call` workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
for CI/CD across the `homelab-ops` and `ppat` GitHub organizations/repos: linting, testing, Docker builds,
releases, and dependency updates.

## Workflows

| Workflow | Description |
| --- | --- |
| [`build-docker-image.yaml`](.github/workflows/build-docker-image.yaml) | Build and optionally push a multi-platform Docker image (Docker Hub and/or a private registry over Tailscale), with registry-backed layer caching and OCI labels/annotations derived from the git ref. |
| [`chainsaw-test.yaml`](.github/workflows/chainsaw-test.yaml) | Spin up a `kind` cluster with Flux installed and run [`kyverno/chainsaw`](https://github.com/kyverno/chainsaw) tests against it. |
| [`detect-changed-files.yaml`](.github/workflows/detect-changed-files.yaml) | Wrap [`tj-actions/changed-files`](https://github.com/tj-actions/changed-files) so downstream jobs can gate on which paths changed in a PR. |
| [`lint-commit-messages.yaml`](.github/workflows/lint-commit-messages.yaml) | Lint a commit range with `commitlint`. |
| [`lint-github-actions.yaml`](.github/workflows/lint-github-actions.yaml) | Lint workflow/action YAML with `actionlint` (shellcheck-integrated). |
| [`lint-hadolint.yaml`](.github/workflows/lint-hadolint.yaml) | Lint Dockerfiles with `hadolint`. |
| [`lint-markdown.yaml`](.github/workflows/lint-markdown.yaml) | Lint Markdown with `markdownlint-cli2`. |
| [`lint-pre-commit.yaml`](.github/workflows/lint-pre-commit.yaml) | Run a fixed set of generic `pre-commit-hooks` (large files, shebangs, JSON, private keys, EOF, line endings, whitespace) against the whole repo. |
| [`lint-renovate-config-check.yaml`](.github/workflows/lint-renovate-config-check.yaml) | Validate Renovate config file(s) with `renovate-config-validator`. |
| [`lint-shellcheck.yaml`](.github/workflows/lint-shellcheck.yaml) | Lint shell scripts with `shellcheck`. |
| [`lint-terraform.yaml`](.github/workflows/lint-terraform.yaml) | Run `terraform fmt -check`, `terraform validate`, and `tflint` across a set of Terraform directories. |
| [`lint-yaml.yaml`](.github/workflows/lint-yaml.yaml) | Lint YAML with `yamllint`. |
| [`lint-zizmor.yaml`](.github/workflows/lint-zizmor.yaml) | Audit GitHub Actions workflows for security issues with [`zizmor`](https://github.com/zizmorcore/zizmor). |
| [`release-please.yaml`](.github/workflows/release-please.yaml) | Cut PR-batched releases (changelog + version + tag) with [`release-please`](https://github.com/googleapis/release-please), driven by conventional commits. |
| [`release-semantic.yaml`](.github/workflows/release-semantic.yaml) | Cut immediate, commit-triggered releases with [`semantic-release`](https://github.com/semantic-release/semantic-release) — dry-run on PRs, real release on `workflow_dispatch`. |
| [`renovate.yaml`](.github/workflows/renovate.yaml) | Run a self-hosted [Renovate](https://github.com/renovatebot/renovate) against a repository. |
| [`update-aqua-checksums.yaml`](.github/workflows/update-aqua-checksums.yaml) | Recompute [`aqua`](https://aquaproj.github.io/) checksum lockfiles and push the result as a signed commit. |

Each workflow's `inputs:`/`secrets:`/`outputs:` block in its YAML file is the authoritative interface —
this table is a summary, not a substitute for reading the file you're about to call.

See [DESIGN.md](DESIGN.md) for how these workflows are structured, how they test themselves
(`self-*.yaml`), and how release/renovate automation fits together, and [CLAUDE.md](CLAUDE.md) for
repo-specific guidance when working with Claude Code.

## Usage

Call a workflow from a consuming repo's own workflow file with `uses:`, pinned to a released tag or
commit SHA:

```yaml
jobs:
  lint-yaml:
    uses: ppat/github-workflows/.github/workflows/lint-yaml.yaml@v4.0.0
    with:
      git_ref: ${{ github.head_ref || github.ref }}
```

For workflows that need a GitHub App token (`release-please.yaml`, `release-semantic.yaml`,
`renovate.yaml`, `update-aqua-checksums.yaml`), pass `app_id`/`app_private_key` as secrets:

```yaml
jobs:
  release:
    uses: ppat/github-workflows/.github/workflows/release-please.yaml@v4.0.0
    secrets:
      app_id: ${{ secrets.HOMELAB_BOT_APP_ID }}
      app_private_key: ${{ secrets.HOMELAB_BOT_APP_PRIVATE_KEY }}
```

See `.github/workflows/self-*.yaml` in this repo for complete, working call sites of every workflow
above.
