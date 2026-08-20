---
description: How to choose the type and scope of a commit in this repo, and why the choice is a release decision.
---

# Commit types and scopes

commitlint gates every PR and release-please derives the version bump and the changelog from the commit header, so the
header is a release decision, not a label. This repo squash-merges with `squash_commit_title=COMMIT_OR_PR_TITLE`, so
on a multi-commit branch the **PR title** is what gets released — it has to be right too.

The header carries two fields answering two questions: **type** is *what kind of change is this?* and **scope** is
*which of this repo's maintenance surfaces did it change?* Never encode "which part of the repo" in the type, or "what
kind of change" in the scope. They are independent in one direction only: a type claiming **shipped behaviour** cannot
sit on a scope that never ships, and commitlint rejects it.

## The artifact boundary

Everything follows from one question, asked of whatever the commit touched:

> **Does this reach a consumer?** Something *ships* if it is resolved at **consumer**-run time by the
> artifact this repo publishes. If only this repo's own CI or local dev loop uses it, it does not.

The published artifact is every `.github/workflows/*.yaml` declaring `on: workflow_call`. Two consequences that are
easy to get backwards:

- **A tool version pinned anywhere inside a reusable workflow file ships** — it changes what runs in a consumer's CI,
  and is not "dev tooling" merely because it is a linter. The deciding construct is the **file**, not any YAML key:
  pins live in workflow- and step-level `env:`, in a step's `with:` input, and in `mise_toml:` heredocs. `scopes.json`
  matches on file path for that reason, so a pin in a new shape is classified correctly with no config change.
- **Files copied into a caller's workspace ship.** `lint-commit-messages.yaml` and `release-semantic.yaml` copy
  `package.json` + `bun.lock` into callers that have none, so the commitlint and semantic-release versions consumers
  run are pinned here.

Everything else — this repo's own pre-commit hooks, linter configs, `self-*.yaml` workflows and `test/` fixtures —
does not ship; the reusable linters always run against the **caller's** config. The test is per-file, so one tool
lands on both sides: `yamllint` in `.pre-commit-config.yaml` is internal, in `lint-yaml.yaml` it ships. Ask where the
pin is, not what the tool is for.

## Scopes

Apply these **in order**, stopping at the first match. The ordering is what guarantees every commit lands in exactly
one scope.

| # | Scope | Matches |
| --- | --- | --- |
| 1 | `release` | A release cut, or a change to the release machinery |
| 2 | `github-actions` | A `uses:` ref bumped or re-pinned — *anywhere*, and nothing else |
| 3 | `kubernetes-api` | A Kubernetes `apiVersion:` bumped — *anywhere*, and nothing else |
| 4 | `shipped-dependencies` | A version pin moved in a file that ships |
| 5 | `internal-dependencies` | A *declared dependency* version moved in a file that does not ship, or a tooling config file was hand-edited |
| 6 | `renovate` | This repo's Renovate *configuration* — never `renovate.yaml`, a reusable workflow like any other |
| 7 | `reusable-workflows` | Hand-authored change to a `workflow_call` workflow: logic, interface, or the `README.md` contract documenting it |
| 8 | `internal-workflows` | This repo's own CI — the `self-*.yaml` workflows and the `test/` fixtures they consume |
| 9 | *(empty)* | Repo-level documentation or policy belonging to no single surface |

Scopes 2 and 3 name a kind of *declaration*, so they are location-independent and sort above the rest. Scopes 4/5 are
the artifact boundary; 7/8 are the same boundary for hand-written changes. Rule 5 covers *declared* versions only —
generated content under `test/` (checksums, recorded fixtures) falls to rule 8 even when a bot writes it, so the
`update-aqua-checksums` run driven by `self-test-aqua.yaml` commits as `test(internal-workflows):`.

When a commit spans surfaces, scope it to the one that **motivated** it — a `README.md` update documenting a new input
rides with `reusable-workflows`. If it genuinely has two motivations, split it. Do not propose per-workflow scopes:
GitHub supports no subdirectories under `.github/workflows/` and a `uses:` ref cannot point into one, so the filename
prefix is the only grouping available, and the subject already names the file.

## Types

Allowed: `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `test`.

`build` and `style` are deliberately **not** allowed: this repo has no build system, `style` is redundant with
`refactor`/`chore`, and `build` is hidden from the changelog — a legal type with no local meaning whose use would
vanish silently. `revert` is kept despite going unused: its meaning is fixed, the parser and release-please
special-case it, and it is the one type you cannot improvise mid-incident.

`feat`/`fix`/`perf`/`refactor` assert something about **shipped behaviour**; the subject-matter types `ci`, `test`,
`docs`, `chore` describe the *kind of thing* changed and take precedence when they apply.

| Change | Header |
| --- | --- |
| New input or capability on a reusable workflow | `feat(reusable-workflows):` |
| Behaviour correction in a reusable workflow | `fix(reusable-workflows):` |
| Speedup or internal restructure of a reusable workflow | `perf` / `refactor(reusable-workflows):` |
| Anything in `self-*.yaml`, **including fixing a genuine bug in one** | `ci(internal-workflows):` |
| A fixture under `test/` | `test(internal-workflows):` |
| Hand-edit to a tooling config file | `chore(internal-dependencies):` |
| Repo docs on their own | `docs:` |
| Cutting a release | `chore(release):` — release-please writes this |

**A type claiming shipped behaviour cannot sit on a non-shipping scope**, and `commitlint.config.js` rejects the
combination. That single constraint keeps ✨ Features and 🚀 Enhancements + Bug Fixes free of internal churn *without
hiding anything* — internal surfaces are pushed onto `chore`/`ci`/`test`/`docs`, which are either hidden or plainly
self-labelled.

**Why `ci`, not `fix`, for a bug in `self-lint.yaml`.** Conventional Commits defines `ci` by subject matter — "changes
to CI configuration files and scripts" — and `self-lint.yaml` *is* one, so `ci` is accurate and the word "fix" belongs
in the subject. `fix` would assert a correction to shipped behaviour, which is the false claim.

This is not a workaround for changelog visibility: `changelog-sections` keys on **type only** (its schema accepts
`{type, section, hidden}` — no scope key) and `exclude-paths` matches directory prefixes with no globs, so neither can
target `self-*.yaml`. Type is the only hiding mechanism there is, and here it is also the honest one. There is no
escape hatch — `fix(internal-workflows)` is rejected. If a `self-*.yaml` change genuinely affects consumers, it
belongs in a reusable workflow.

**Hidden types can suppress the release entirely.** release-please renders the notes first, then skips the release
when the result is empty (`changelogEmpty()` in `strategies/base.ts`). A window of **only** hidden types (`ci`,
`test`) cuts no version and no tag; any visible type cuts one — a release can come from `chore` alone, which is why
`chore` is not hidden. Version *size* is computed separately, unaffected by visibility: breaking → major, `feat` →
minor, else patch.

## What belongs under `chore`

`chore` is the catch-all and is **visible** in consumers' release notes — deliberately, since most `chore` commits are
pin, digest and lockfile updates on `shipped-dependencies` and `github-actions`, which change what runs in a
consumer's CI. The cost is that a miscategorised `chore` lands in front of that audience.

| `chore` **may** carry | `chore` **must never** carry |
| --- | --- |
| Renovate pin / digest / lockfile updates | A change to what a reusable workflow *does* |
| Hand-edits to tooling config that change no shipped behaviour | A genuine bug fix, anywhere |
| `chore(release)` — release-please's own cut | Documentation, fixtures, or internal CI config |
| | **Anything breaking** |

`chore!` is a contradiction — a change forcing consumers to act is not housekeeping; give it the type that describes
what changed, plus `!`. "It was only a small fix" is no reason to reach for `chore`: `fix` for shipped behaviour, `ci`
for `self-*.yaml`. One leak is accepted — `chore(internal-dependencies)` appears in consumers' notes and alone cuts a
patch release; hiding `chore` would suppress the pin updates that are the section's point.

## Breaking changes

Mark them with **`!` after the type and optional scope** — `feat(reusable-workflows)!:`. release-please keys on the
`!` alone and emits `### ⚠ BREAKING CHANGES` from it even with no footer; add a `BREAKING CHANGE: <what consumers must
do>` footer anyway, since release-please prints it when present and falls back to the subject line when absent. The
footer needs the colon and a description — a bare `BREAKING CHANGE` line parses as nothing. **`!` cuts a major release
here**, moving every consumer's pin, so use it deliberately.

What counts as breaking follows from the artifact boundary, but the test differs by author:

- **A change you write by hand** — judge the consumer contract. Non-shipping scopes (`internal-dependencies`,
  `internal-workflows`, `renovate`, `kubernetes-api`) are **never** breaking. Shipping scopes are breaking only if a
  consumer on the current major must change their calling workflow or their repo: an input, output or secret removed
  or renamed, a default changed, a new required permission or runner.
- **A dependency bump** — the test is the version, not the judgement. Renovate cannot read an upstream changelog, and
  asking a human to decide on every bump means it never gets decided, so **a major of anything that ships carries
  `!`**, decided mechanically from the file the pin lives in:

| Major update to… | Header |
| --- | --- |
| a pin inside a reusable workflow | `feat(shipped-dependencies)!:` |
| `package.json` / `bun.lock` | `feat(shipped-dependencies)!:` |
| a `uses:` ref inside a reusable workflow | `feat(github-actions)!:` |
| anything in a `self-*.yaml` | `chore(internal-dependencies):` — no `!` |
| `.pre-commit-config.yaml`, `test/` fixtures, `kubernetes-api` | no `!` |

Renovate has no "emit a breaking marker" setting, so these rules hand-build the header with `commitMessagePrefix` plus
`semanticCommits: "disabled"` — supplying a prefix suppresses Renovate's own semantic-prefix assembly, which is what
makes `!` stick.

**The consequence is deliberate: every major bump of a shipped dependency cuts a major release of this repo** —
accuracy bought at the cost of version-number economy. A consumer on the previous major is unaffected until they move
their pin, which is what a major is for; shipping a changed tool under a patch bump would hide it. Those majors also
get `automerge: false`, asserted explicitly rather than inherited because a shared preset can re-enable automerge for
a package pattern without filtering on update type.

**The commit body is cleared, not filled.** `commitBody` sits behind a truthy check
(`workers/repository/update/branch/index.js`), so `""` is identical to unset; it is not release notes (those go in the
PR body) nor the dependency table (`commitBodyTable`, separate, default `false`, never enabled here). Major bumps
arrive carrying a bare `BREAKING CHANGE` line — no colon, so it parses as nothing while conflicting with the `!`
convention — and clearing it loses only that. Filling it with a real footer is worse: with no footer release-please
prints the **subject line**, naming the dependency and both versions, rather than one fixed sentence repeated on every
entry.

## What Renovate emits, and why it must match

`scope-enum` must accept every scope Renovate can produce, or its PRs are rejected and dependency updates stop.
`.github/renovate/scopes.json` maps Renovate's output onto the scopes above and is loaded last so its rules win.
Renovate picks its type from the dependency's semver level (`feat` major/minor, `fix` patch/digest, `chore`
pin/lockfile); leave its titles alone.

**Re-run the enumeration whenever the shared-preset pin moves** — an upstream rule that starts matching a manager this
repo uses reopens the emission-vs-acceptance gap with no local change. `scopes.json` is written to be **invariant**
across such a bump (it claims each scope unconditionally and restores the semver-derived type explicitly), so emitted
headers do not depend on which preset version is pinned. Verify that rather than assuming it. Two rules of thumb:

- **Claim the scope with no `matchUpdateTypes`.** A scope rule enumerating update types leaves the unnamed ones
  (`replacement`, `rollback`, `bump`) to fall through to an upstream scope this repo rejects.
- **Never assume a type survives.** If an upstream rule may force `semanticCommitType`, restore the type here rather
  than relying on the upstream update-type mapping reaching the end of the chain.

**Classify by file, never by package name.** The Renovate CLI is the worked example: pinned in `renovate.yaml` and
`lint-renovate-config-check.yaml`, both `workflow_call` workflows, so it **ships** even though an upstream rule
matches it by package name and would call it internal — do not add a package-name rule to correct that. Equally, do
not narrow the manager-level defaults to exclude `bun` because `package.json` ships: the SHIPS rule promotes it, and
that default is what stops a dep the narrower upstream matchers miss from landing on the empty scope.

Every rule in `scopes.json` must earn its place: remove each in turn and re-resolve the whole set, and a rule changing
nothing in either reachable or latent cells is dead. Run that before adding a rule and after any preset upgrade — a
rule load-bearing under one preset version can go dead under the next.
