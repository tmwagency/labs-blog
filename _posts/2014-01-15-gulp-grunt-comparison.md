---
comments: true
layout: post
title: "Running Gulp through it's paces"
date: 2014-01-16 15:30:00
categories:
  - "front-end"
  - "gulp"
  - "grunt"
  - "node"
author: zander
excerpt: ""
published: true
---

[Gulp](http://gulpjs.com/) is the new hot young thing on the front-end circuit, it is a task runner similar to [Grunt](http://gruntjs.com). There are many anecdotal reports saying that Gulp is far quicker than Grunt at performing similar tasks so naturally I wanted to see this for myself using Kickoff as a Guinea Pig.

[Kickoff](http://tmwagency.github.io/kickoff/) uses Grunt to compile Sass and update the browser view on-the-fly; concatenate and minify Javascripts; and a few other tasks, so it was fairly easy to port the config from one to the other. Travis Maynard has written a great [intro to Gulp](http://travismaynard.com/writing/getting-started-with-gulp) which made this switch doubly easy. This post is not about how to use Gulp but rather to compare the two 'task runners'.

The Gulp fork of Kickoff can be found at [github.com/tmwagency/kickoff/tree/gulp](https://github.com/tmwagency/kickoff/tree/gulp) and the [gulpfile.js](https://github.com/tmwagency/kickoff/blob/gulp/gulpfile.js) holds all the config. I found editing the `gulpfile` quite easy, more so than a Gruntfile; I followed similar ideas to our Grunt setup to make it more maintainable e.g. using variables to avoid repetition, see lines [16-37](https://github.com/tmwagency/kickoff/blob/gulp/gulpfile.js#L16-L37) of the current gulpfile.

## Speed comparison tests
### Sass compilation
<figure><img src="/img/blog/kickoff-gulp-test/compare-sass.gif" alt="Grunt and Gulp Sass compilation comparison"></figure>

The difference here is massive, and immediately you can see what all the fuss is about. Grunt uses [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) and Gulp uses [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass/) (both of which use Ruby) to compile. Gulp-ruby-sass is slower than [gulp-sass](https://github.com/dlmanning/gulp-sass), but more stable and feature-rich.


### Javascript minification and concatination using Uglify.js
<figure><img src="/img/blog/kickoff-gulp-test/compare-js.gif" alt="Grunt and Gulp Javascript minification and concatination using Uglify.js"></figure>

The difference here is not that large but it is still impressive.

### Live Reload
Live Reload is an indispensable tool and both Gulp and Grunt have plugins for it (Grunt's is built into [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)). I was not able to measure the speeds between the two but I would say that Gulp was noticeably quicker overall, but not hugely.

## Conclusion
As you can see Gulp is insanely fast, but that does not mean we are going to be making the switch any time soon. It doesn't have some the ecosystem and support that Grunt has, although the one man army of [Sindre Sorhus](https://twitter.com/sindresorhus) might be changing that!

## Find out more
* [Gulp home page](http://gulpjs.com/)
* [Gulp plugins directory](http://gratimax.github.io/search-gulp-plugins/)
* [Gulp Github repo](https://github.com/gulpjs/gulp)
* [Introduction to Gulp](http://slid.es/contra/gulp) by it's creator, [Eric Schoffstall](https://twitter.com/eschoff)
* [Getting started with Gulp](http://travismaynard.com/writing/getting-started-with-gulp) by Travis Maynard - great intro to Gulp
* [Gulp, Grunt, Whatever](http://blog.ponyfoo.com/2014/01/09/gulp-grunt-whatever) by Nicolas Bevacqua - another good intro