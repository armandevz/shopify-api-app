module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint-config-airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: ['error', 'always'],
    camelcase: 'off',
    'no-multiple-empty-lines': [2, { max: 2 }],
    indent: ['error', 2],
    'no-empty': 'warn',
    'class-methods-use-this': 0,
  },
};