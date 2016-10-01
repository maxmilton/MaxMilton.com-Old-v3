+++
author      = "Max Milton"
date        = "2016-04-25T09:23:00+10:00"
description = "Quick tips, insights, and other thought provoking posts."
email       = "max@wearegenki.com"
tags        = ["misc.", "quick tips"]
title       = "What Are Quick Tips?"
+++

Quick tips are an ongoing series of short posts where I'll teach you something I've found useful. From time to time, I'll post insights I find thought provoking too. Here's a simple example<!--more-->:

## Number of characters in a string

I wanted to count how many characters are in one line on this blog &mdash; UX best practice is about 70&ndash;80 per line for best readability. Using a web service is overkill for such a simple task, let's use our terminal instead.

In your favourite Unix shell enter:

`$ echo 'How many characters in this?' | wc -m`

<samp>29</samp>

Or if you want to know how many words:

`$ echo 'How many characters in this?' | wc -w`

<samp>5</samp>

Done. Quick and easy :)
