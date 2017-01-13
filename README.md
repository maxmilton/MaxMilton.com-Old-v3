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

### For Production

**Manual or test build:**

1. `$ build.sh`

**Production deployment:**

1. Copy the deploy script: `cp deploy.sh.sample deploy.sh`
2. Edit `deploy.sh` to suit your needs
3. `$ deploy.sh`

## Writing style guide

Use British English spelling and grammar. Follow the [Guardian and Observer style guide](https://www.theguardian.com/info/series/guardian-and-observer-style-guide).

### With these additions

* Post title (h1): Title Case
* Post sub headings (h2–h6): Sentence case
* Common word spelling: ecommerce, ebook, internet, website
* Use em dashes without spaces either side—except in headings
* Use **bold** or _italic_, but not **_together_**
* Posts must have a unique description and one or more topic tags
* Each image must have an alt title

## Changelog

**v1.15.2**
:  2017-01-14 — Better homepage subscribe implementation, new SCSS file import strategy, improve deployment script upload robustness, upgrade Bootstrap and NPM packages

**v1.15.1**
:  2016-12-27 — Fix font on buttons and inputs, fix link click area size and nav links, adjust for better spacing on small breakpoints

**v1.15.0**
:  2016-12-27 — Remove x3 image size, remove copyright symbol from footer, small CSS performance optimisations, fix build error in hugo v0.18, update Bootstrap to latest git rev, update NPM packages

**v1.14.0**
:  2016-12-10 — Improve deploy script, NPM module clean up, update Overpass fonts, remove ttf fonts as we no longer support IE8 or old mobile browsers

**v1.13.0**
:  2016-12-02 — Simplify category listing pages, revert link style to default, update Overpass fonts, remove abbr styles in favour of more descriptive word choice

**v1.12.0**
:  2016-11-19 — Change colour scheme to blue instead of purple, fix button style when in a post, update Bootstrap, deploy script now cleans up old backups

**v1.11.0**
:  2016-10-28 — Simplify CSS build process, optimise CSS selectors, simplify HTML, remove GA autotrack, update Bootstrap, more aggressive HTML minification, new ASCII art in source, completely remove all JavaScript build tasks

**v1.10.0**
:  2016-10-23 — Many small changes to the build script, switch to using Yarn instead of NPM and add yarn.lock file, add blockquote style

**v1.9.1**
:  2016-10-16 — Add link hover state, fix long links overflowing, disable automated _blank on external links (not working)

**v1.9.0**
:  2016-10-15 — Switch from gulp-image to gulp-imagemin (faster, more customisable, more popular), clean up gulp script, fix depreciation warning in build script, update NPM module versions and Bootstrap from upstream

**v1.8.1**
:  2016-10-10 — New link style, small tweaks to tables, add caption support to img shortcode, fix bold font not rendering

**v1.8.0**
:  2016-10-02 — Change colour and link styles, clean up homepage, show tags on list pages, tweak RSS feeds, add YouTube shortcode override for Bootstrap compatibility, make `<abbr>` responsive, move vendor JS to NPM for easier management, add 'skip to main content' accessibility feature, fix datetime format

**v1.7.1**
:  2016-09-25 — Fix summary image removal (big thanks to [@moorereason](https://github.com/spf13/hugo/issues/2490)!), fix image spacing, fix error when enlarging image during resizing

**v1.7.0**
:  2016-09-24 — Add responsive image shortcode, add image processing, fix homepage post summary list; show the 10 most recent published posts, add writing style guide

**v1.6.0**
:  2016-09-14 — Spice up the deploy scripts, remove unused directories, prevent Browsersync reloading more than once following hugo page generation, tweak typography for better spacing and on small screens

**v1.5.1**
:  2016-09-10 — Fix Browsersync reloading and CSS/JS injecting, clean builds every time with extra build step, cleaner looking tables, tweak CSS build for slightly smaller files

**v1.5.0**
:  2016-09-10 — Add combine CSS media queries step to build, modernize font stack; remove unnecessary fonts, fix tags on posts, restore author metadata in drafts, make external links open in a new tab

**v1.4.0**
:  2016-09-07 — Add an easy way to view drafts, capture custom GA data + fix GA tracking ID, update bootstrap to v4.0.0-alpha.4

**v1.3.0**
:  2016-07-29 — Update Bootstrap and npm modules, small screens header fix

**v1.2.1**
:  2016-06-11 — Fix nav on small screens and minor style tweaks

**v1.2.0**
:  2016-06-04 — Move author and meta section to bottom of posts and centre page content

**v1.1.0**
: 2016-04-30 — Add sample deployment script, cache busting for compiled CSS/JS, RSS feed, extra meta tags

**v1.0.0**
:  2016-04-27 — Initial public release

## Licence

Blog content licensed under the Creative Commons Attribution No Derivatives 4.0 ([CC-BY-ND-4.0](http://creativecommons.org/licenses/by-nd/4.0/legalcode)) licence. When quoting my posts, please link back to the original article.

Site theme licensed ISC, see [themes/mm/LICENCE.md](https://github.com/MaxMilton/MaxMilton.com/blob/master/themes/mm/LICENSE.md).

## Author

Proudly made by Max Milton &lt;<max@wearegenki.com>&gt;.
