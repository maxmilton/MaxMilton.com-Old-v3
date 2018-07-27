// https://github.com/michael-ciniawsky/postcss-load-config

'use strict';

const minnaUiPostcssConfig = require('@minna-ui/postcss-config');
const variables = require('./css/variables.js');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  plugins: [
    minnaUiPostcssConfig({
      variables,
      verbose: isDev,
    }),
  ],
};

// module.exports = ctx => ({
//   // map: ctx.options && ctx.options.map,
//   ...ctx.options,
//   plugins: [
//     minnaUiPostcssConfig({ verbose: isDev }),
//   ],
// });
