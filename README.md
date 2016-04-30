Source for the website of Max Milton &mdash; powered by Hugo, Gulp, and Bootstrap v4 &mdash; <https://maxmilton.com>.

# Overview

A simple blog which uses Node.js + Gulp automation to make development and deployment easy. Site generated with Hugo, a fast static website engine, which makes creating websites fun again. Theme uses Bootstrap v4 to make building faster.

NOTE: Browser-sync is used to serve the site when in development &mdash; the auto-reload is awesome and makes developing across mutliple devices easy. I much prefer it over the Hugo built in server.

Read more about the release at <https://maxmilton.com/blog/blog-source-code-now-availiable-on-github.html>.

Feel free to use my Hugo theme as the base for your own site. Let me know if you use the code, I'd love to see what you do with it!

## How To Build

### For Development

Install prerequisites then run `gulp` to start a local dev server.

1. Install [Node.js](https://nodejs.org)
2. Install [Hugo](https://github.com/spf13/hugo/releases)
3. `$ cd themes/mm`
4. `$ npm install`
5. `$ gulp`

### For Production

**Test build only:**

1. `$ build.sh`

**Production deployment:**

1. Copy the deploy script: `cp deploy.sh.sample deploy.sh`
2. Edit `deploy.sh` to suit your needs
3. `$ deploy.sh`

## Changelog

v1.1.0
: 2016-04-30 - Add sample deployment script, cache busting for compiled CSS/JS, RSS feed, extra meta tags

v1.0.0
:  2016-04-27 - Initial public release

## Licence

Blog content is licenced under the Creative Commons Attribution No Derivatives 4.0 ([CC-BY-ND-4.0](http://creativecommons.org/licenses/by-nd/4.0/legalcode)) licence. When quoting my posts, please link back to the original article.

Site theme is licenced ISC, see [themes/mm/LICENCE.md](https://github.com/MaxMilton/MaxMilton.com/blob/master/themes/mm/LICENSE.md).

## Author

Proudly made by Max Milton &lt;<max@wearegenki.com>&gt;.
