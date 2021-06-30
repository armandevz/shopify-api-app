module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
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
    'class-methods-use-this': 0
  },
};
