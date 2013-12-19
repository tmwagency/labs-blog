---
comments: true
layout: post
title: "Structuring team development"
date: 2013-12-19 09:00:00
categories:
  - "front-end"

author: ashnolan
excerpt: "It's important to make sure a team of developers are all on the same page when developing across multiple projects. We look at what helps our front-end team at TMW."
published: true
---

Every development team has their own way of working together.  Here at TMW, we are no different (other than perhaps having an unhealthy obsession with cake).

The creative tech team at TMW was put together just over 18 months ago, back in April 2012, when [Zander](https://twitter.com/mrmartineau) and I joined the company.  Before that point, there was no structure in the front-end development work being done; no guidelines, no frameworks.

I was shocked that such a large agency had none of this in place, but it gave us a massive opportunity and was one of the reasons I relished the opportunity at TMW.  We had the opportunity to shape the way our team would work right from the start, which is usually a situation afforded to start-ups.

Our aim was, and still is, to put just enough in place to ensure the whole team is working on the same page.  Both Zander and myself had worked on projects where something as basic as the structure of a project could be a major stumbling block to anyone else coming onto the team and these were the type of issues we wanted to get right from the start.

The team has now grown to 6 people – a mix of creative technologists and interactive developers – and the things we put in place when there were only 2 of us in the team have only needed to be tweaked during that growth, not completely overhauled.

So I just wanted to share the tools we have used to help our team and that can help any development team of any size. I'll also take you through some of the resources we've started to build up that assist in our development and that we've been making openly available.


## Define your way of working

One of the first things we did was to draw up a set of [guidelines and standards](http://tmwagency.github.io/TMW-frontend-guidelines/) for how we develop.

No matter what the size of the team, you should know what standards and code conventions you are all developing to, ensuring that they're consistent.  It means that whatever project you are on, it should look like a project that one of your team has written, instead of having to decipher how you should write your code to be consistent.  As a team, decide how you want to standardise this and document it.

Writing documentation from scratch can be a barrier for some, so  instead take an existing set and adjust it to your needs.  Our TMW guidelines took inspiration from Isobar's ['Front-end Code Standards & Best Practices'](http://isobar-idev.github.io/code-standards/) and Harry Roberts ['CSS Guidelines'](https://github.com/csswizardry/CSS-Guidelines), using the bits we agreed with and building on top of them with our own documentation.

Documenting these decisions can have all sorts of benefits.  New starters have something that informs them on the standards the team develops to.  It can help control the output of freelancers, as it is a reference for the standard you expect them to code to.

Above all, it acts as an evolving reference point for your team; you can refer anyone to it to tell them about the way in which you work.  We've found this useful when hiring to show potential team members that we care about the work we produce, as well as it being open for clients the standards to which we code to.


## Structure your codebase

The other issue we had come across in the past is front-end structure.  when editing a project that another team member has done, you should know where things are.  It should never feel like you're having to play a game of 'guess where the CSS and JS files are hiding' – a game I recommend you don't play with your family this Christmas.

To solve this issue, we built our own framework for use on internal project called [Kickoff](http://tmwagency.github.io/kickoff/) which Zander wrote about in more detail [last week](/2013/12/introducing-kickoff/).

We didn't want the bloat of using [Bootstrap](http://getbootstrap.com/), while also wanting a level of control over the evolving structure of our projects without relying on a third party framework.  Kickoff is therefore more minimal than those, made to create consistent structure rather than enforcing coding style.

We actively maintain Kickoff, looking at aspects of other frameworks and changing parts of it to keep up with the evolution of front-end development.

Like documentation, not everyone will want to, or have the time to, maintain their own framework.  What I would advise is that you choose a consistent framework across your projects.  There's little point in using [Bootstrap](http://getbootstrap.com/) on one project and then [Foundation](http://foundation.zurb.com/) on the next.  You'll just end up with lots of projects with an inconsistent structure, making maintaining them harder.

If you don't use a framework and want to use one, checkout [Kickoff](http://tmwagency.github.io/kickoff/), or take a look at the [vast array of frameworks](http://usablica.github.io/front-end-frameworks/compare.html) already out there.


## Re-use what you've built

Something we've started to do more as the team has grown is to make our code more portable across projects, between team members, so we can reuse code snippets more readily in the future.

We maintain a few useful [JavaScript classes and plugins](https://github.com/tmwagency/js-classes-and-plugins) on Github, for things like image preloading and adaptive images.  Slightly bigger libraries we've split into separate repos, like [Swiftclick](https://github.com/tmwagency/swiftclick).  and we also try and white label projects we work on, so for example we're currently doing this with the node applications we've recently been working on.

We also maintain regularly used snippets within our framework, whether that's [maintaining useful JavaScript helpers](https://github.com/tmwagency/kickoff/tree/master/js/helpers) or [useful SASS mixins](https://github.com/tmwagency/kickoff/tree/master/scss/mixins) that can be used on any project.

We'll be writing about some of these in more detail in future posts, but what I want to emphasise is the importance of making the effort to make your code portable between projects and team members.  Even if you work mostly on your own, spending the time to make a useful piece of code portable and putting it somewhere you can easily access it can save hours down the line.

Within a team, the hardest part of this is actually knowing what has been built previously that you can then use yourself.  Github helps us manage this, as it allows us to commit code we think could be of use on any project and all of the members of our team will get a notification and know where to find it.

Building this culture into your team will reap dividends, and is something we're working hard on within the team at TMW.

## Build for the future

The main goal with all of these is to build with the future in mind.  What would I care about if I got pulled onto a project half-way through?  The aim is to help deal with common frustrations we all feel when in this situation.

Keeping things that don't need to change consistent, means that people are better oriented with the project style and structure at whatever point they start on a project.  I always know where the grunt file lives, where the responsive mixins are located and where typography related CSS styles go in our SASS structure.

Some of these may seem like small things, but they can all add up to save a lot of time down the line.  They may take time to put in place, but I can assure you it'll be worth the effort.
