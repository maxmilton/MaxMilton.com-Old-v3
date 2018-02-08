// https://github.com/michael-ciniawsky/postcss-load-config

const path = require('path');

module.exports = (ctx) => ({
  plugins: {
    'postcss-import': { path: ['src', 'node_modules']},
    'postcss-at-rules-variables': {},
    'postcss-each': {},
    'postcss-mixins': { mixinsDir: [
      path.join(__dirname, 'node_modules/@wearegenki/ui/src/css/mixins'), // FIXME: Any way to automate this so developers don't need to do it?
      path.join(__dirname, 'src/css/mixins'),
    ]},
    'postcss-nested': {},
    'postcss-css-variables': {},
    'postcss-conditionals': {},
    'postcss-custom-media': {},
    'postcss-calc': { warnWhenCannotResolve: true },
    'postcss-color-function': {},
    'css-mqpacker': {},
    'autoprefixer': { remove: false },
    'postcss-reporter': { filter: msg => msg.type !== 'dependency' },
  }
});
