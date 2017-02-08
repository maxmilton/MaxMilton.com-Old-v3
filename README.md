Source for the website of Max Milton — powered by Hugo, Gulp, and Bootstrap 4 — <https://maxmilton.com>.

# Overview

A simple blog that uses Node.js + Gulp for automation to make development and deployment easy. The site is generated using Hugo, a fast static website engine, which makes creating websites fun again. The theme is based on Bootstrap 4 for agile design.

NOTE: Uses Browsersync to serve the site when in development—the auto-reload is awesome and makes developing across multiple devices at once easy. Hugo comes with a simple server but Browsersync is better for rapid development.

Read more about the release at <https://maxmilton.com/blog/blog-source-code-now-available-on-github.html>.

Feel free to use my Hugo theme as the base for your own site. Let me know if you use the code, I'd love to see what you do with it!

## How to build

### For development

Install prerequisites then run `gulp` to start a local dev server.

1. Install [Node.js](https://nodejs.org)
2. Install [Hugo](https://github.com/spf13/hugo/releases)
3. `$ cd themes/mm`
4. `$ npm install`
5. `$ gulp`

### For production

**Manual or test build:**

1. `$ build.sh`

**Production deployment:**

1. Copy the deploy script: `cp deploy.sh.sample deploy.sh`
2. Edit `deploy.sh` to suit your needs
3. `$ deploy.sh`

## Writing style guide

See [content/styleguide.md](https://github.com/MaxMilton/MaxMilton.com/blob/master/content/styleguide.md).

## Changelog

See [CHANGELOG.md](https://github.com/MaxMilton/MaxMilton.com/blob/master/CHANGELOG.md).

## Licence

Blog content licensed under the Creative Commons Attribution No Derivatives 4.0 ([CC-BY-ND-4.0](http://creativecommons.org/licenses/by-nd/4.0/legalcode)) licence. When quoting my posts, please link back to the original article.

Site theme licensed ISC, see [themes/mm/LICENCE.md](https://github.com/MaxMilton/MaxMilton.com/blob/master/themes/mm/LICENSE.md).

## Author

Proudly made by Max Milton &lt;<max@wearegenki.com>&gt;.
