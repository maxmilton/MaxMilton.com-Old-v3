+++
author      = "Max Milton"
date        = "2016-09-10T15:35:00+10:00"
description = "You make changes only to realise you don't have write access... here's a way to save without exiting the Vim session."
email       = "max@wearegenki.com"
tags        = ["quick tips", "linux"]
title       = "Write as Sudo and Other Useful Vim Tricks"
+++

If you do any command line Vim editing, I'm sure you've run into this situation... you make changes to a file only to realise you don't have write access with your current user and should have used sudo.

Let me show you an easy way to save without exiting the Vim session and 2 extra tricks for super Vim productivity<!--more-->.

You can write as sudo using:

`:w !sudo tee %`

Another tip is to put this in your .vimrc file for easy use. To bind the command to <kbd><kbd>W</kbd></kbd>, add this to your .vimrc file:

`command W w !sudo tee % > /dev/null`

## Bonus

1. To run an external command use `:! <command>` or to get the output of the command directly into Vim use `:.! <command>` (note the extra dot). An example of this is `:.! pwd` to get the current directory into your Vim session.
2. Another I use all the time is <kbd><kbd>u</kbd></kbd> to undo and <kbd><kbd>ctrl</kbd> + <kbd>r</kbd></kbd> to redo.
