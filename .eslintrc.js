module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'jest'
  ],
  rules: {
    'no-unused-vars': 'off', // disable default rule, because it error on types
    '@typescript-eslint/no-unused-vars': 'off', // instead use this rule
    'no-shadow': 'off', // https://github.com/typescript-eslint/typescript-eslint/issues/325
    'no-use-before-define': 'off', // cause error on types
    'no-useless-constructor': 'off', // dont stack with typescript's constructor argument sugar
    'no-dupe-class-members': 'off',
    'no-redeclare': 'off',
    'no-octal-escape': 'off'
  }
}
