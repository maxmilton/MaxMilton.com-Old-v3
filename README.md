<!-- markdownlint-disable first-line-h1 -->

[![Build status](https://img.shields.io/travis/MaxMilton/MaxMilton.com.svg)](https://travis-ci.org/MaxMilton/MaxMilton.com)
[![Licence](https://img.shields.io/github/license/MaxMilton/MaxMilton.com.svg)](https://github.com/MaxMilton/MaxMilton.com/blob/master/LICENCE)

# MaxMilton.com

Source code for the website <https://maxmilton.com>.

_NOTE: The site theme is in a seperate repo: <https://github.com/MaxMilton/hugo-theme-mm>._

## Overview

TODO: Write me.

### Usage

#### Install

1. Install [yarn](https://yarnpkg.com/lang/en/docs/install/) and [docker](https://docs.docker.com/install/) if you haven't already.
1. Install NPM dependencies:
    ```sh
    yarn install
    ```
1. Build the `hugo` bin docker image:
    ```sh
    yarn run build:hugo-bin
    ```

#### Development

```sh
yarn run dev
```

#### Production

1. Run a production build:
    ```sh
    yarn run build
    ```
1. Edit the `deploy.sh` script to suit your deployment strategy.
1. Run the deployment script:
    ```sh
    yarn run deploy
    ```

### Writing style guide

See [content/styleguide.md](https://github.com/MaxMilton/MaxMilton.com/blob/master/content/styleguide.md).

## Licence

`MaxMilton.com` is an MIT licensed open source project. See [LICENCE](https://github.com/MaxMilton/MaxMilton.com/blob/master/LICENCE).

-----

© 2018 [Max Milton](https://maxmilton.com)
