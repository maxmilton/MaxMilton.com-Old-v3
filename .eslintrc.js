// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  // parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    },
  },
  env: {
    browser: true,
    node: true,
    'jest/globals': true
  },
  plugins: [
    'prettier',
    // 'compat',
    'jest',
  ],
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:jest/recommended',
  ],
  rules: {
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    // FIXME: REMOVE BEFORE GOING LIVE
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,

    // We Are Genki
    // TODO: Remove things which are not necessary here
    // 'compat/compat': 'warn', // find features which need a polyfill
    // 'no-param-reassign': ['error', { props: false }],
    // 'no-underscore-dangle': 'off', // needed for PouchDB
    // 'no-use-before-define': 'off', // FIXME: Currently broken with destructuring
    // 'max-len': ['error', {
    //   code: 120,
    //   tabWidth: 2,
    //   ignoreComments: true,
    //   ignoreTrailingComments: true,
    //   ignoreUrls: true,
    //   ignoreStrings: true,
    //   ignoreTemplateLiterals: true,
    // }],
    'object-curly-spacing': ['error', 'always', { objectsInObjects: false }],
    'object-curly-newline': ['error', { consistent: true }]
  }
};
