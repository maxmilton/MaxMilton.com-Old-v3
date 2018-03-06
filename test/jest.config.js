'use strict'; // eslint-disable-line

const path = require('path');

// const libDir = '<rootDir>/node_modules/@wearegenki/test/lib/hyperapp';

module.exports = {
  preset: '@wearegenki/test',
  rootDir: path.resolve(__dirname, '..'),
  coverageDirectory: '<rootDir>/test/coverage',
  // resolver: `${libDir}/resolver.js`,
  transform: {
    // '^.+\\.jsx?$': 'babel-jest', // don't use babel to transpile
    // '^.+\\.(html|marko)$': `${libDir}/transform.js`,
  },
  browser: true, // use browser field in package.json
};
