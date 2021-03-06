---
comments: true
layout: post
title: "The Future of Umbraco"
date: 2014-03-11 11:00:00
categories:
  - "Back-end"
  - "CMS"
  - "Umbraco"
  - "Dot Net"
  - "Cloud"

contributor:
  name: Tim Coppinger
  twitter: MilitantPenguin
  short_desc: ".Net Developer, avid snowboarder and nerf gun owner."
excerpt: "The Umbraco CMS team are adding another string to the bow of their CMS. Tim has a quick look to see what's in store."
published: true
---

I went to the monthly London Umbraco meet up a few weeks ago and was fortunate enough to get a demo of the next big thing in Umbraco; Umbraco as a service.

Currently in closed beta – due out mid may this year – UaaS (no sniggering at the back)  allows you to “spool up” an instance of Umbraco in the cloud in under a minute. Despite the demo being run over a 3g tethered connection the online set up was very easy.

##UaaS in a nutshell
- Hosted on top of azure (actually in partnership with MS)
- Can choose between v6 or v7
	- Automated upgrade to new versions will be available (3rd party package compatibility dependent)
- Has 4 subscription types <sup>1</sup>
	- Dev / test – one Developer, one environment (free) (SQL CE)
	- Freelancer – one Developer, Two environments:  Stage and live (free) (SQL CE)
	- Studio  – 3  Developers, 3 environments: Dev, Stage, Live ($50/m) (SQL Azure)
	- Agency – unlimited  Developers, 3 environments: Dev, Stage, Live ($99/m) (SQL Azure)
- Uses git as the file system. All file changes = a commit.
- Allows for one click deployment. Uses an implementation of courier.

>[1] Developer/environment numbers are “per site” (i.e. a freelancer could have 5 sites each with two environments) and the paid for subscriptions might increase in the future.

The biggest advantage is most definitely the speed in which you can deploy code and content changes from your staging instance through to live. It’s as simple as one click, which is a massive bonus as content replication can often be an ardous task. For any simple small sites we plan to run it could potentialy solve the time/cost of setting up a site under our usual Continous Integration / Automated deployment system.

Another advantage is that Mac users can work on the HTML and CSS through the browser, with any and all changes being stored in the git file system. No need for dual booting or remoting into a VM with Visual studio. But we are not just confined to developing through the browser. All devs (win, mac or linux) can easily clone the site locally, work on the project and deploy updates by committing back to the main git repo; the best of both worlds.

The future is almost here. Find out more about UaaS over on [Umbraco.com](http://umbraco.com/future.aspx).