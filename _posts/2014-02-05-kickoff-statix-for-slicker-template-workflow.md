---
comments: true
layout: post
title: "Kickoff Statix: A slicker template workflow"
date: 2014-02-05 10:00:00
categories:
  - "front-end"
  - "templates"
  - "assemble"
  - "grunt"
  - "kickoff"

author: ashnolan
excerpt: "Introducing a more efficient way to get up and running when creating static templates or sites."
published: true
---

Developing static templates has historically been a bit of a pain in the ass.

Most frameworks of choice such as BootStrap use flat HTML to develop templates, which although fine, becomes less flexible the more templates you have.  Sharing markup across static templates can only be achieved by integrating your own templating language, such as handlebars, using server side includes, or worse case, [by using jQuery](http://stackoverflow.com/questions/8988855/include-another-html-file-in-a-html-file).

Having been using static site generators, such as [Jekyll](http://jekyllrb.com/), for a good while now, I recently started using [Assemble](http://assemble.io/).  Both excellent tools, the main difference I have found is that Assemble can generate templates from a wider array of data types, whereas Jekyll focuses on loading data from YAML and Markdown.

Using these tools got me thinking; static site generators could be used in the front-end workflow to help when building static site templates, not just building full static websites.  This would be especially useful when we are required to handover static templates for integration to backend devs, or when we wanted to keep a version of the static pages separate from the integrated build files.  We could then use the power of static site generators when creating templates.

So I built [Kickoff Statix](http://tmwagency.github.io/kickoff/statix/index.html), a simple setup of Assemble, integrated with our front-end framework, [Kickoff](http://tmwagency.github.io/kickoff/).

This means that when templating, you have the power of using handlebars to share markup across multiple pages – such as header files and navigation.  You can also parse Markdown to keep your development code clean from sample content.  Most importantly this is all setup by simply [downloading the project repo](https://github.com/tmwagency/kickoff-statix) and running `grunt serve` from the base of the project in the terminal.

No config to fiddle with (unless you want to), it just attempts to alleviate some of the most basic headaches faced when creating static templates by setting up a structure for you to start from and build upon.

Because the project is built using Assemble and Grunt, it is easily extensible and configurable to anyone who is familiar with these tools.  Think of it as a quick and flexible templating setup, like Bootstrap, just with a bit more oomph.

More details about how to use Kickoff Statix can be found in the [documentation](http://tmwagency.github.io/kickoff/statix/index.html) or in the [Github Readme](https://github.com/tmwagency/kickoff-statix).

If you have any questions about using Statix or just general feedback, [give us a shout on Twitter](http://twitter.com/TMW_Labs).
