'use-strict';

module.exports = {
  root: true,
  extends: [
    '@wearegenki/eslint-config/node',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
  },
};
