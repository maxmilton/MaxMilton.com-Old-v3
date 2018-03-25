/* eslint-disable max-len */// tslint:disable:max-line-length

import browserSync from 'browser-sync';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import historyApiFallback from 'connect-history-api-fallback';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
// import purgecss from 'rollup-plugin-purgecss';

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
  // FIXME: Redo this as which props are safe to mangle has changed between releases
  // mangle: {
  //   properties: {
  //     // Bad patterns: children, pathname, previous
  //     // Suspect: nodeName
  //     // regex: /^(__.*|state|actions|attributes|isExact|exact|subscribe|detail|params|render|oncreate|onupdate|onremove|ondestroy|nodeName)$/,
  //     // debug: 'XX',
  //   },
  // },
  output: {
    comments: !!process.env.DEBUG,
    wrap_iife: true,
  },
  ecma: 8,
  toplevel: true,
  warnings: !!process.env.DEBUG,
};

function browsersync() {
  if (!bs.active) {
    bs.init({
      server: {
        baseDir: 'dist',
        directory: true,
        middleware: [historyApiFallback()],
      },
      port: 1234,
      open: false,
      ghostMode: false,
      logConnections: true,
    });
  }

  return {
    name: 'browsersync',
    onwrite(bundle) {
      bs.reload(bundle.dest);
    },
  };
}

export default {
  input: 'src/index.js',
  experimentalCodeSplitting: true,
  experimentalDynamicImport: true,
  output: {
    file: 'dist/mc.js',
    name: 'mc',
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
    // FIXME: PurgeCSS plugin is not working
    // isProduction && purgecss({
    //   content: ['index.html'],
    // }),

    // TODO: Asset cache invalidation
    // TODO: Service worker & other nice PWA features
    //  ↳ https://github.com/GoogleChrome/workbox
    //  ↳ https://developers.google.com/web/tools/workbox/
    // TODO: Add clean-css

    // DEVELOPMENT
    !isProduction && browsersync(),
  ],
};

// TODO: Custom rollup.watch setup (?)
//  ↳ https://rollupjs.org/guide/en#rollup-watch
