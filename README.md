# github-workflows

Reusable [GitHub Actions `workflow_call` workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
for CI/CD across the `homelab-ops` and `ppat` GitHub organizations/repos: linting, testing, Docker builds,
releases, and dependency updates.

## Workflows

| Workflow | Description |
| --- | --- |
| [`build-docker-image.yaml`](.github/workflows/build-docker-image.yaml) | Build and optionally push a multi-platform Docker image to Docker Hub, a private registry over Tailscale, and/or GHCR (`ghcr.io`, via `ghcr_repository`, authenticated with the ambient `GITHUB_TOKEN` -- no secrets needed, but see below for a `packages: write` permission every caller must grant). A target is "requested" when its repository input is non-empty and well-formed (no leading/trailing `/`, no empty path segment -- a malformed value, e.g. from an unset variable interpolated into the input, is treated as unset with a warning); a requested Docker Hub/private-registry target missing its credentials fails the job, except on a fork PR, where secrets are withheld and it is disabled with a warning instead; a target with no repository requested is simply disabled (with a warning, not an error -- a *complete* set of credentials inherited via `secrets: inherit` but unused by a target you didn't request is harmless; a *partial* set is not -- Docker Hub and private-registry credentials must be all-or-nothing, and a partial set fails the job even for a target you never requested, since there's no way to tell "half-inherited and unused" apart from "half-configured by mistake"); a run with no publish targets configured is a green build-only run (also warned), and in that case `digest`/`image_refs` come back empty since nothing was pushed. Registry-backed layer caching imports/exports a `:branch-<name>` ref per branch plus a shared `:cache-latest`, and OCI labels/annotations are derived from the git ref, which must resolve to a branch or a tag (`git_ref` may be fully-qualified or bare) -- anything else, e.g. a `refs/pull/N/merge` ref, fails the job rather than publishing an unversioned image. `platforms`, `label_title`, `label_description`, and `timeout_minutes` all have defaults (`linux/amd64`; the caller repo's name/description; `30`) but can be overridden per call. See "Publishing to GHCR" below for the `packages: write` permission this workflow requires unconditionally from every caller, and other caveats specific to that target. |
| [`chainsaw-test.yaml`](.github/workflows/chainsaw-test.yaml) | Spin up a `kind` cluster with Flux installed and run [`kyverno/chainsaw`](https://github.com/kyverno/chainsaw) tests against it. |
| [`detect-changed-files.yaml`](.github/workflows/detect-changed-files.yaml) | Wrap [`tj-actions/changed-files`](https://github.com/tj-actions/changed-files) so downstream jobs can gate on which paths changed in a PR. |
| [`lint-commit-messages.yaml`](.github/workflows/lint-commit-messages.yaml) | Lint a commit range with `commitlint`. |
| [`lint-github-actions.yaml`](.github/workflows/lint-github-actions.yaml) | Lint workflow/action YAML with `actionlint` (shellcheck-integrated). |
| [`lint-hadolint.yaml`](.github/workflows/lint-hadolint.yaml) | Lint Dockerfiles with `hadolint`. |
| [`lint-markdown.yaml`](.github/workflows/lint-markdown.yaml) | Lint Markdown with `markdownlint-cli2`. |
| [`lint-opentofu.yaml`](.github/workflows/lint-opentofu.yaml) | Run `tofu fmt -check`, `tofu validate`, and `tflint` across a set of [OpenTofu](https://opentofu.org/) directories -- the same checks as `lint-terraform.yaml`, against the `tofu` CLI instead of `terraform` (`tflint` parses HCL directly, so it lints either identically). |
| [`lint-pre-commit.yaml`](.github/workflows/lint-pre-commit.yaml) | Run a fixed set of generic `pre-commit-hooks` (large files, shebangs, JSON, private keys, EOF, line endings, whitespace) against the whole repo. |
| [`lint-renovate-config-check.yaml`](.github/workflows/lint-renovate-config-check.yaml) | Validate Renovate config file(s) with `renovate-config-validator`. |
| [`lint-shellcheck.yaml`](.github/workflows/lint-shellcheck.yaml) | Lint shell scripts with `shellcheck`. With `files: ALL` it lints every executable file that identifies itself as shell, by shebang (`sh`/`bash`/`dash`/`ksh`) or by a `.sh`/`.bash` extension; otherwise it lints exactly the caller-supplied file list. |
| [`lint-terraform.yaml`](.github/workflows/lint-terraform.yaml) | Run `terraform fmt -check`, `terraform validate`, and `tflint` across a set of Terraform directories. |
| [`lint-yaml.yaml`](.github/workflows/lint-yaml.yaml) | Lint YAML with `yamllint`. |
| [`lint-zizmor.yaml`](.github/workflows/lint-zizmor.yaml) | Audit GitHub Actions workflows for security issues with [`zizmor`](https://github.com/zizmorcore/zizmor). `min_severity`/`min_confidence`/`persona` inputs tune what gets reported (defaulting to the org-wide `medium`/`high`/`regular`); `advisory_only: true` reports findings without failing the job. |
| [`release-please.yaml`](.github/workflows/release-please.yaml) | Cut PR-batched releases (changelog + version + tag) with [`release-please`](https://github.com/googleapis/release-please), driven by conventional commits. |
| [`renovate.yaml`](.github/workflows/renovate.yaml) | Run a self-hosted [Renovate](https://github.com/renovatebot/renovate) against a repository. |
| [`update-aqua-checksums.yaml`](.github/workflows/update-aqua-checksums.yaml) | Recompute [`aqua`](https://aquaproj.github.io/) checksum lockfiles and push the result as a signed commit. |

Each workflow's `inputs:`/`secrets:`/`outputs:` block in its YAML file is the authoritative interface —
this table is a summary, not a substitute for reading the file you're about to call.

See [DESIGN.md](DESIGN.md) for how these workflows are structured, how they test themselves
(`self-*.yaml`), and how release/renovate automation fits together, and [CLAUDE.md](CLAUDE.md) for
repo-specific guidance when working with Claude Code.

## Publishing to GHCR

`build-docker-image.yaml`'s GHCR target (`ghcr_repository`) authenticates with the ambient `GITHUB_TOKEN`
-- **no secrets are needed**. A minimal call looks like:

```yaml
jobs:
  build-image:
    permissions:
      contents: read           # must be restated: any permissions: block zeroes unlisted scopes
      packages: write          # required on EVERY caller of this workflow, see below
    uses: ppat/github-workflows/.github/workflows/build-docker-image.yaml@v8.1.0 # x-release-please-version
    with:
      image_context_path: .
      git_ref: ${{ github.head_ref || github.ref }}
      ghcr_repository: owner/name
```

**Why every caller must grant `packages: write`, whether or not they use GHCR:** `build-docker-image.yaml`
declares `packages: write` unconditionally on its own job, because a job's `permissions:` block accepts no
expressions -- it cannot be gated on whether a given call actually uses GHCR. A called (`workflow_call`)
job that declares a permission its caller hasn't granted fails the **entire workflow at load time**, not
just the job: zero jobs run, no annotations are produced, only a top-level error like:

```text
The workflow is not valid. .github/workflows/<caller>.yaml (Line: N, Col: N): Error calling workflow
'<org>/github-workflows/.github/workflows/build-docker-image.yaml@<ref>'. The nested job 'build-image' is
requesting 'packages: write', but is only allowed 'packages: none'.
```

This is a hard failure, not a degraded run, and it affects **every** caller of this workflow -- including
one that only ever publishes to Docker Hub or the private registry and never touches GHCR -- because the
permission is on the called job, not conditional on which target you requested. That's the price of the
feature: grant `packages: write` (and restate `contents: read`, since specifying any `permissions:` block
zeroes every scope you don't list) on the job that calls `build-docker-image.yaml`, or the run never
starts.

**An earlier iteration of this workflow instead had the caller pass a `GITHUB_TOKEN` forwarded as a
secret** (`ghcr_username`/`ghcr_token`), reasoning that the called job's own token couldn't be scoped for
GHCR. That does not work: `docker/login-action` succeeds (it only validates token form), but the push
403s with `denied: installation not allowed to Write organization package`. GHCR authorizes against the
permissions of the job that actually executes the push, not whichever job a token string was minted in --
so the token has to come from `packages: write` on the job doing the push itself, which is why this
workflow's own job declares it unconditionally instead.

Two things to know beyond the permission, neither of which the job can catch for you at startup:

- **The first push to a given package must come from this workflow (i.e. from CI), not a manual
  `docker push` from your machine.** A package pushed manually first is never linked to a repository, and
  `GITHUB_TOKEN` then has no permission to push to it -- a documented GitHub trap that produces a
  permissions error unrelated to your `permissions:` block.
- **GitHub's docs say a brand-new package is private by default, regardless of the linked repository's own
  visibility -- and that visibility does not inherit, only access permissions do** ([Configuring a
  package's access control and
  visibility](https://docs.github.com/en/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility),
  checked 2026-08-20). **This workflow's own first GHCR push contradicted that**: on a personal (non-org)
  account, pushing from a public repository's CI produced a package that came out **public** with nobody
  touching a setting --
  `gh api /users/OWNER/packages/container/NAME --jq '{visibility,repository:.repository.full_name}'`
  showed `public` immediately, and the image was confirmed genuinely, anonymously pullable (`curl` against
  the GHCR manifest endpoint with a credential-free token succeeded). The usual confounds don't explain
  it: there's no personal-account equivalent of the org-only "Package creation" default-visibility
  setting, and the package's `created_at` timestamp falls inside the very first push's CI run, ruling out
  an earlier/different creation path. **Treat this as unresolved rather than as a new rule** -- the docs
  and this repo's own observation disagree, and we don't know which conditions (org vs. personal account,
  public vs. private repo, first push vs. later push) flip the outcome. **Don't assume either default:
  check the package's actual visibility after your first push**, with the `gh api` one-liner above or the
  package's Settings page, rather than trusting either this doc or GitHub's.
- Whichever way it lands, GitHub still documents that flipping a package from **private to public is
  one-time, manual, and irreversible** -- Settings → Danger Zone → Change visibility on github.com, with
  an explicit "Once you make a package public, you cannot make it private again" warning in that flow --
  and that there is no REST endpoint, GraphQL field (deprecated for GHCR in 2022), or `gh` CLI command to
  do it ([cli/cli#6820](https://github.com/cli/cli/issues/6820) is still open as of 2026-08-20). That cuts
  both ways: you can't script *making* an image public, and if your package turns out public when you
  didn't want that, you can't script undoing it either -- budget for a manual click either direction.
- **A fork PR cannot disable GHCR the way it can Docker Hub or the private registry.** The fork carve-out
  (repository requested, credentials withheld -> warn and disable instead of failing) only ever fires when
  the target has a non-zero credential set to be missing; GHCR authenticates with the ambient
  `GITHUB_TOKEN` and has none (`creds_total` is 0 for it), so that branch is arithmetically unreachable for
  GHCR regardless of fork status. If `ghcr_repository` is well-formed -- including one built from the
  `github` context, which still resolves on a fork PR -- GHCR stays a requested, enabled target: there's no
  code path here that turns it off for a fork the way there is for the other two targets. GitHub separately
  clamps a fork PR's token to read-only, so a run that reaches this state either fails at load (the job's
  unconditional `packages: write` request exceeds what a fork PR's token is allowed) or 403s at the push
  step.

## Usage

Call a workflow from a consuming repo's own workflow file with `uses:`, pinned to a released tag or
commit SHA:

```yaml
jobs:
  lint-yaml:
    uses: ppat/github-workflows/.github/workflows/lint-yaml.yaml@v8.1.0 # x-release-please-version
    with:
      git_ref: ${{ github.head_ref || github.ref }}
```

For workflows that need a GitHub App token (`release-please.yaml`, `renovate.yaml`,
`update-aqua-checksums.yaml`), pass `client_id`/`app_private_key` as secrets:

```yaml
jobs:
  release:
    uses: ppat/github-workflows/.github/workflows/release-please.yaml@v8.1.0 # x-release-please-version
    secrets:
      client_id: ${{ secrets.HOMELAB_BOT_CLIENT_ID }}
      app_private_key: ${{ secrets.HOMELAB_BOT_APP_PRIVATE_KEY }}
```

Those tokens are minted scoped to the calling repository only, with an explicit permission set per
workflow. The App installation behind `client_id`/`app_private_key` must already carry at least these
permissions — `actions/create-github-app-token` fails outright when asked for one the installation
does not have:

| Workflow | Installation permissions requested |
| --- | --- |
| [`release-please.yaml`](.github/workflows/release-please.yaml) | `contents: write` (tags + releases), `pull-requests: write` (release PR), `issues: write` (`autorelease:*` labels) |
| [`update-aqua-checksums.yaml`](.github/workflows/update-aqua-checksums.yaml) | `contents: write` (signed commit of the updated checksums) |
| [`renovate.yaml`](.github/workflows/renovate.yaml) | whatever the installation grants — Renovate's needs are broad and config-dependent (contents, pull-requests, issues, workflows, packages, checks, statuses, members, vulnerability alerts) |

See `.github/workflows/self-*.yaml` in this repo for complete, working call sites of every workflow
above.
