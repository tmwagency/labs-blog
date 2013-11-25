---
comments: true
layout: post
title: "Live reloading preprocessed CSS using Grunt"
categories:
- code
- grunt
---

Having recently changed my development process from using the awesome [Codekit](http://incident57.com/codekit/) to [Grunt](http://gruntjs.com), I was frustrated that I no longer had live updates without a browser refresh when I made changes to my CSS; fortunately for me, there is a plugin for Grunt that solves this problem and, funnily enough, I happened to be using it already.

The plugin in question is called [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch), it is a common plugin developed by the maintainers of Grunt itself and has recently been updated (v 0.4.4) to allow live reloading to work in this way.

<img src="/img/posts/grunt-logo.svg" alt="Grunt logo" class="no-shadow">

We are going to add a new subtask within the existing _watch_ task called **livereload** that monitors your generated CSS file(s) (or directory) for changes and then triggers a livereload. Make sure you include `options: { livereload: true }` otherwise the livereload server will not work. See below for what my livereload watch subtask looks like:
{% gist 5734805 grunt-watch-livereload-subtask.js %}

### Install browser extensions
Adding the subtask above is not enough, you will need to install the Livereload browser extension in order to see the styles live reload. It is available for [Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) and [Firefox](https://addons.mozilla.org/en-us/firefox/addon/livereload/). For information on how to use these extensions, please see their documentation.

### Run the watch task
Now all you need to do is run `grunt watch`, start editing your preprocessed CSS and view the styles reloading as you make those changes. Bear in mind that depending on the complexity of your preprocessed CSS, it might take a few seconds for the change to appear - SASS is notoriously slow if you use many `@extend`s.

Below is an example of a full watch task with the included `scss`, `js` and `livereload` subtasks or you can see the `Gruntfile.js` that I use on this site, [here](https://github.com/mrmartineau/martineau.tv/blob/master/Gruntfile.js):
{% gist 5734805 grunt-watch-task.js %}