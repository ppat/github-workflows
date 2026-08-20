// Scopes that only ever carry machine-generated dependency updates. Renovate formats those bodies
// itself, so they are exempt from the body line-length limit.
// NOTE: this used to test for `chore(deps)`, which 'scope-enum' below does not allow and Renovate
// never emits here -- the exemption was unreachable. These are the scopes it actually produces.
const dependencyUpdateScopes = ['github-actions', 'internal-dependencies', 'kubernetes-api', 'shipped-dependencies']

// A type that asserts a change to *shipped* behaviour may only be paired with a scope that can
// actually reach a consumer. This is what keeps the consumer changelog's Features / Enhancements
// sections free of internal churn without hiding anything: internal surfaces take chore/ci/test/docs,
// which are either hidden or self-labelled. See .claude/rules/commits.md.
const shippedBehaviourTypes = ['feat', 'fix', 'perf', 'refactor']
const scopesThatCanShip = ['', 'github-actions', 'release', 'reusable-workflows', 'shipped-dependencies']

const validateTypeScopePairing = (parsedCommit) => {
  const { type, scope } = parsedCommit
  const isShippedBehaviourClaim = shippedBehaviourTypes.includes(type)

  return [
    !isShippedBehaviourClaim || scopesThatCanShip.includes(scope || ''),
    `type '${type}' asserts a change to shipped behaviour and cannot be used with scope '${scope}', ` +
    `which never reaches a consumer -- use chore, ci, test or docs instead (see .claude/rules/commits.md)`,
  ]
}

const validateBodyMaxLengthIgnoringDeps = async (parsedCommit) => {
  const { maxLineLength } = await import('@commitlint/ensure');

  const { scope, subject, body } = parsedCommit
  const isDependencyUpdate =
    dependencyUpdateScopes.includes(scope) && /^(update|pin) /.test(subject || '')

  const bodyMaxLineLength = 120;

  return [
    isDependencyUpdate || !body || maxLineLength(body, bodyMaxLineLength),
    `commit message body line length must not exceed ${bodyMaxLineLength}`,
  ]
}

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    // increase max line length for header
    'header-max-length': [2, 'always', 120],

    // disable max line length for footers
    'footer-max-line-length': [0, 'always'],

    // disable default 'body-max-line-length' rule and add custom rule for body-max-line-length
    'body-max-line-length': [0],
    'function-rules/body-max-line-length': [
      2,
      'always',
      validateBodyMaxLengthIgnoringDeps
    ],

    // reject type/scope pairings that claim shipped behaviour on a scope that cannot ship
    'function-rules/scope-enum': [2, 'always', validateTypeScopePairing],

    // restrict the types allowed by @commitlint/config-conventional. Dropped: 'build' (this repo has
    // no build system -- 0 uses in 586 commits, and it is hidden from the changelog, so a stray one
    // would vanish silently) and 'style' (redundant with refactor/chore here -- 0 uses). 'revert' is
    // kept despite 0 uses: it has a fixed meaning, the parser special-cases it, and it is the one
    // type you cannot substitute under time pressure.
    'type-enum': [2, 'always',
      [
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'test'
      ]
    ],

    // specify the allowed scopes -- see "Commit types and scopes" in CLAUDE.md for what each one means
    'scope-enum': [2, 'always',
      [
        '',
        'github-actions',
        'internal-dependencies',
        'internal-workflows',
        'kubernetes-api',
        'release',
        'renovate',
        'reusable-workflows',
        'shipped-dependencies'
      ]
    ],
    // 'scope-empty': [2, 'always'],

    // don't validate case of body
    'body-case': [0, 'always']
  }
}
