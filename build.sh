#!/bin/bash

#----------------------------------------------#
# Build a deployable package of a hugo website #
#----------------------------------------------#
#
# For developer ease of use and happiness; it's easier to run
# a script than to remember all these commands in order!
#
# Licence: ISC (see ./themes/mm/LICENCE.md)
# Author: Max Milton <max@wearegenki.com>
#

# Define variables
THEME_DIR="./themes/mm"
DEPLOY_FILE="./deployme.tgz"

echo -e "\033[1;33mStarting build\033[0m\n"

# Check if Hugo is installed
hash hugo 2>/dev/null || {
  echo -e >&2 "Hugo is not installed. Get it from:\n\n https://github.com/spf13/hugo/releases\n"
  exit 1
}

# Check if Node.js is installed
hash npm 2>/dev/null || {
  echo -e >&2 "NPM not found. Install Node.js to continue:\n\n  https://nodejs.org/en/\n"
  exit 1
}

# Check if Gulp is installed
hash gulp 2>/dev/null || {
  # Install Gulp
  sudo npm -g i gulp-cli
}

# Check if Node modules are already installed
if [ ! -d "$THEME_DIR/node_modules" ]; then
  echo -e >&2 "You need to install the theme Node modules first, run:\n\n  1. cd theme/mm\n  2. npm install\n"
  exit 1
fi

echo -e "Starting Gulp build process...\n"

# Remove files from ealier builds
gulp --gulpfile $THEME_DIR/gulpfile.js clean
# Run Gulp build process
gulp --gulpfile $THEME_DIR/gulpfile.js build

# Remove ealier deployable file
rm -f $DEPLOY_FILE

# Create a deployable package
echo -e "\nCreating deployable file..."

tar -zcf $DEPLOY_FILE ./public && echo -e "Done; $(wc -c)\n"

echo -e "\033[1;33mBuild complete!\033[0m"
