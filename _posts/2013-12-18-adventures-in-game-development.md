---
comments: false
layout: post
title: "Adventures in game development"
categories:
- general

author: simonkinslow
excerpt: A designer's foray into game development
---

Over the years I've had an interest in programming starting with Flash, a few years ago though I made the seemingly [obvious choice](http://www.apple.com/hotnews/thoughts-on-flash/) to start moving on from Actionscript to focus on Javascript. I find that the best way to learn is by doing, so since the start of the summer I started creating a little responsive HTML and Javascript game. This and subsequent posts will document my process.

The working title is **‘Bitmap Adventure’** and the premise revolves around a huge villain, in the form of a block-like Monkey, kidnapping a Goat’s child. Rescuing the child and defeating this villain, along with others, is your challenge.

The battle system uses Paper, Scissors, Stone (otherwise known as Janken). The progress of the battle uses some some basic pixel animation with cute simple versions of the warriors. To introduce users to the battle system I decided to feature a battle in the intro itself, where you attempt to battle the villain straight away, but with battle inexperience so early on in the game you’ll lose, its all part of the intro. I’m still working on how a levelling / experience feature will work within the game.

Developing the intro helped to get my head around how the game would work on different devices from the start. I started off with a 320px wide photoshop document when I was creating a look and feel for the game figuring out the mobile look and size first. The reason behind this is the game could get complex so its easier to add than take away from the intended design. There were many cases of developing my prototypes and designing at the same time to get it looking right across all devices. With such a simple graphical style and patterns throughout the game, its a little easier to add filler for wider screen formats. Supporting Retina devices couldn’t be easier with this, as all the original sprites just needed to be resized to 200% with Nearest Neighbour image resampling to preserve the hard pixel edges.

<figure><img src="/img/blog/adventures-in-game-dev/post1-b.jpg" alt="Positioning elements"></figure>

So far I’m still in the early stages, with the intro 90% complete, and the game area coming along nicely in both design and development. All the levels, weather parameters, and portal positions are all managed through settings in a JSON file, this makes it easier to manage and update when needed. Levels are designed in Photoshop using tiles fitting to a 40px x 40px grid which are then positioned in the game converting the JSON data into CSS positions.

<figure><img src="/img/blog/adventures-in-game-dev/post1-a.jpg" alt="Positioning elements"></figure>

The portals have been the biggest Javascript headache so far. There were a fair amount of cases where the character would enter the portal and not reappear through the next showing no Javascript errors. Exiting the portal seemed to work differently on Chrome and Safari at times too, a current fix is to give Chrome a slight timeout / delay with the level reload to fix the error, this is down to differences in rendering engines in different browsers.

With Javascript being more strict than Actionscript, I’m finding that more and more I just have to change my approach in writing Javascript to solve certain problems; its all part of learning. Of course I could have built this in Flash, but first off it wouldn’t work on Mobile and I wouldn’t have learnt anything new.

You can see a prototype of the intro and entering the game area at [simonkinslow.com/_2013/bitmap_prototype/part1/](http://simonkinslow.com/_2013/bitmap_prototype/part1/)

<small>Note: On touch devices use the weird black crab to control the character, on desktop use the arrow keys, and ideally use Chrome or Safari.</small>
