export const tslint = {
  defaultSeverity: 'error',
  extends: ['tslint:recommended'],
  jsRules: {},
  rules: {
    'jsdoc-require': false,
    'quotemark': [true, 'single'],
    'interface-name': true,
    'no-implicit-dependencies': false,
    'no-submodule-imports': false,
    'missing-jsdoc': false,
    'no-any': false,
    'no-empty-interface': false,
    'export-name': [
      false,
      {
        'ignore-case': true
      }
    ],
    'strict-boolean-expressions': false,
    'trailing-comma': true,
    'no-console': false,
    'no-relative-imports': false,
    'variable-name': [
      true,
      'ban-keywords',
      'check-format',
      'allow-leading-underscore'
    ],
    'arrow-parens': false,
    'adjacent-overload-signatures': true,
    'arrow-return-shorthand': [true, 'multiline'],
    'comment-format': [true, 'check-space'],
    'indent': [true, 'spaces'],
    'no-consecutive-blank-lines': true,
    'no-parameter-reassignment': false,
    'align': false,
    'no-parameter-properties': false,
    'completed-docs': false,
    'no-unsafe-any': false,
    'prefer-const': true,
    'typedef': false,
    'no-increment-decrement': false,
    'newline-per-chained-call': false,
    'max-line-length': false,
    'ordered-imports': false,
    'prefer-readonly': false,
    'object-literal-sort-keys': false
  },
  linterOptions: {
    exclude: ['node_modules']
  },
  rulesDirectory: []
};
