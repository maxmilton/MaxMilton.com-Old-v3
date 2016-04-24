+++
author = "Max Milton"
date = "2016-04-23T06:40:05+10:00"
description = ""
email = "max@wearegenki.com"
tags = ["quick tips", "misc."]
title = "What Are Quick Tips?"
+++

Quick tips are short posts to teach you something I've find helpful
 or to
 be thought provoking
  about something which blew my mind recently.

Here's a simple example:

## How Many Characters in a String?

I wanted to count how many characters are in one line on this blog &mdash; UX best practice is about 70&ndash;80 per line for best readability. Using a web service is overkill for such a simple task, lets use our terminal instead.

In your favorite Unix shell enter:

`$ echo 'How many characters in this?' | wc -m`

`29`

Or if you want to know how many words:

`$ echo 'How many characters in this?' | wc -w`

`5`

Quick and easy :)
