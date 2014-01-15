---
comments: true
layout: post
title: "Speedtesting Gulp and Grunt"
date: 2014-01-15 15:30:00
categories:
  - "front-end"
  - "gulp"
  - "grunt"
  - "node"
author: zander
excerpt: "Using our Kickoff framework, Zander compares two of the most popular client-side task runners."
published: true
featuredImage: '/img/blog/kickoff-gulp-test/featured.gif'
---

[Gulp](http://gulpjs.com/) is the new hot young thing on the front-end circuit; it is a task runner similar to [Grunt](http://gruntjs.com). There are many anecdotal reports saying that Gulp is far quicker than Grunt at performing similar tasks so naturally I wanted to see this for myself using [Kickoff](http://tmwagency.github.io/kickoff/) – the front-end framework we use at TMW – as a Guinea Pig.

[Kickoff](http://tmwagency.github.io/kickoff/) uses Grunt for a number of tasks; compiling Sass and updating the browser view on-the-fly and concatenating and minifying Javascript for example. Porting this config from Grunt to Gulp was fairly easy. Travis Maynard has written a great [intro to Gulp](http://travismaynard.com/writing/getting-started-with-gulp) which made this switch doubly easy.

The Gulp fork of Kickoff can be found at [github.com/tmwagency/kickoff/tree/gulp](https://github.com/tmwagency/kickoff/tree/gulp) and the [gulpfile.js](https://github.com/tmwagency/kickoff/blob/gulp/gulpfile.js) holds all the config. I found editing the `gulpfile` quite easy; more so than a Gruntfile. I followed similar ideas to our Grunt setup to make it more maintainable e.g. using variables to avoid repetition – see lines [16-37](https://github.com/tmwagency/kickoff/blob/gulp/gulpfile.js#L16-L37) of the Kickoff gulpfile.

## Speed comparison tests
### Sass compilation
<figure><img src="/img/blog/kickoff-gulp-test/compare-sass.gif" alt="Grunt and Gulp Sass compilation comparison"></figure>

The difference here is massive and immediately you can see what all the fuss is about. Grunt uses [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) and Gulp uses [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass/) (both of which use Ruby) to compile. Gulp-ruby-sass is slower than [gulp-sass](https://github.com/dlmanning/gulp-sass), but more stable and feature-rich so I will make the switch when it improves. See the gulpfile settings for this [here](https://github.com/tmwagency/kickoff/blob/gulp/gulpfile.js#L51-L65).


### Javascript minification and concatination using Uglify.js
<figure><img src="/img/blog/kickoff-gulp-test/compare-js.gif" alt="Grunt and Gulp Javascript minification and concatination using Uglify.js"></figure>

The difference here is not that large but it is still impressive. See the gulpfile settings for this [here](https://github.com/tmwagency/kickoff/blob/gulp/gulpfile.js#L67-L83).

### Live Reload
Live Reload is an indispensable tool for us, both Gulp and Grunt have plugins for it (Grunt's is built into [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)). I was not able to measure the speeds between the two but I would say that Gulp was noticeably quicker overall, but not hugely.

## Conclusion
As you can see Gulp is insanely fast, but that does not mean we are going to be making the switch any time soon. There are two plugins that we regularly use that aren't supported by Gulp, these are [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect) (for starting a static web server) and [grunt-jekyll](https://github.com/dannygarcia/grunt-jekyll) (for building our Jekyll sites). Gulp just doesn't have the ecosystem and support that Grunt has; although the one man army of [Sindre Sorhus](https://twitter.com/sindresorhus) might be changing that!

## Find out more
* [Gulp home page](http://gulpjs.com/)
* [Gulp plugins directory](http://gratimax.github.io/search-gulp-plugins/)
* [Gulp Github repo](https://github.com/gulpjs/gulp)
* [Introduction to Gulp](http://slid.es/contra/gulp) by it's creator, [Eric Schoffstall](https://twitter.com/eschoff)
* [Getting started with Gulp](http://travismaynard.com/writing/getting-started-with-gulp) by Travis Maynard - great intro to Gulp
* [Gulp, Grunt, Whatever](http://blog.ponyfoo.com/2014/01/09/gulp-grunt-whatever) by Nicolas Bevacqua - another good intro
