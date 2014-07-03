---
comments: true
layout: post
title: "A designers adventures in game development: part 1"
date: 2013-12-18 09:00:00
categories:
- general
- games

author: skinslow
excerpt: Wanting to learn more about responsive design and JavaScript, Simon decided to foray into game development and start creating an old skool bitmap game.
---

Over the years I've had an interest in programming starting with Flash, a few years ago though I made the seemingly [obvious choice](http://www.apple.com/hotnews/thoughts-on-flash/) to start moving on from Actionscript to focus on Javascript. I find that the best way to learn is by doing, so since the start of the summer I started creating a little responsive HTML and Javascript game. This and subsequent posts will document my process.

It's working title is **‘Bitmap Adventure’** with the story revolving around a huge villain, in the form of a block-like Monkey, kidnapping a Goat’s child. Rescuing the child and defeating the villain is your main challenge.

The battle system uses Paper, Scissors, Stone (otherwise known as Janken). The visualisation of these battles uses some some basic pixel animation with cute, simple versions of the warriors. To introduce players to the battle system I decided to feature a battle in the intro itself, where you attempt to battle the villain straight away, but with battle inexperience so early on in the game you’ll lose; its all part of the intro. I’m still working on how a levelling / experience feature will work within the game.

Developing the intro helped to get my head around how the game would work on different devices from the start. I started off with a 320px wide photoshop document when I was creating a look and feel for the game, figuring out the mobile look and size first. The reason behind this is the game could get complex so its easier to add than take away from the intended design. There were many cases of developing prototypes and designing at the same time, to ensure it looked great across all devices. With such a simple graphical style, it's a little easier to add filler for wider screen formats. Supporting Retina devices couldn’t be easier with this, as all the original sprites just needed to be resized to 200% with Nearest Neighbour image resampling to preserve the hard pixel edges.

<figure><img src="/img/blog/adventures-in-game-dev/post1-b.jpg" alt="Positioning elements"></figure>

The game is still in the early stages, with the intro 90% complete, and the game area coming along nicely in both design and development. All the levels, weather parameters and portal positions are all managed through settings in a JSON file, which makes it easier to manage and update when needed. Levels are designed in Photoshop using tiles fitting to a 40px x 40px grid, which are then positioned in the game converting the JSON data into CSS positions.

<figure><img src="/img/blog/adventures-in-game-dev/post1-a.jpg" alt="Positioning elements"></figure>

The portals have been the biggest Javascript headache so far. There were a number of cases where the character would enter the portal and then not reappear through the next, showing no Javascript errors. Exiting the portal seemed to work differently on Chrome and Safari at times too; the current fix is to give Chrome a slight delay when the level reloads to fix the error.  This seems to be simply due to differences in rendering engines across different browsers.

With Javascript being more strict than Actionscript, I’m finding that I have to change my coding approach to solve certain problems; its all part of learning. Of course I could have built this in Flash, but I wanted the game to work on mobile devices and writing it in JavaScript helps me learn a new language.

You can see a prototype of the intro and entering the game area at [simonkinslow.com/_2013/bitmap_prototype/part1/](http://simonkinslow.com/_2013/bitmap_prototype/part1/).

<small>Note: On touch devices use the weird black crab to control the character. On desktop use the arrow keys, and ideally use Chrome or Safari.</small>
