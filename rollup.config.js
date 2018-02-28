import browserSync from 'browser-sync';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import uglify from 'rollup-plugin-uglify';

const bs = browserSync.create();

// const isProduction = !process.env.ROLLUP_WATCH;
const isProduction = process.env.NODE_ENV === 'production';

const uglifyOpts = {
  compress: {
    drop_console: isProduction,
    drop_debugger: isProduction,
    negate_iife: false, // better performance when false
    passes: 2,
    pure_getters: true,
    unsafe: true,
    unsafe_proto: true,
  },
  mangle: {
    properties: {
      // Breaks: children, pathname, previous
      regex: /^(__.*|state|actions|attributes|nodeName|isExact|subscribe|detail|params|render)$/,
      // debug: 'XX',
    },
  },
  output: {
    comments: !!process.env.DEBUG,
    wrap_iife: true,
  },
  ecma: 8,
  toplevel: true,
  warnings: !!process.env.DEBUG,
};

// FIXME: Implement hot reloading / change injection: https://browsersync.io/docs/options
function browsersync() {
  if (!bs.active) {
    bs.init({
      server: 'dist',
      // files: 'dist',
      // files: 'src',
      port: 1234,
      open: false,
      ghostMode: false,
      logConnections: true,
    });
  }

  return {
    name: 'browsersync',
    onwrite: function (bundle) {
      bs.reload(bundle.dest);
    }
  }
}

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/mm.js',
    format: 'iife',
    sourcemap: isProduction,
    interop: false, // saves bytes with externs
  },
  plugins: [
    postcss({
      extract: true,
      sourceMap: true,
    }),
    commonjs(),
    resolve({
      jsnext: true,
      extensions: ['.js', '.jsx', '.json', '.css'],
    }),
    buble({ jsx: 'h' }),

    // PRODUCTION
    isProduction && uglify(uglifyOpts),
    // TODO: Add purgecss
    // TODO: Add clean-css

    // DEVELOPMENT
    !isProduction && browsersync(),
  ],
};
