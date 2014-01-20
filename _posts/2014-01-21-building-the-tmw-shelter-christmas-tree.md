---
comments: true
layout: post
title: "Building the TMW Shelter Christmas Tree"
date: 2014-01-21 13:00:00
categories:
  - "arduino"
  - "php"
  - "xmas"

author: asheridan
excerpt: "Ash explains how we built a Christmas tree with a digital twist."
published: true
---

## The brief

Christmas is about many things; overindulgences, family arguments, and thoughtless gifts, but among the better aspects are the general gestures of goodwill and decorations to put even Santas grotto to shame. So, what project could be better than a digital Christmas tree that raised money for the charity Shelter?

The initial concept, thought up by Marlen Lutter, was simple; decorate a tree and raise money for Shelter. The key to this was to incentivise people to donate money, and we wanted to reward them for donating. Now the heart of any good tree is the set of lights it bears (and not, I'm told, tinsel) so naturally a tree that is slowly lit by donations was the obvious choice, and a great starting point. Of course, we couldn't just stop there, we wanted the tree to be more impressive and give feedback to the lovely people donating, so we threw in an LED matrix display, of the kind you see on trains and buses.

## The build

Working through the general ideas we realised there was one issue that needed addressing: what donation should trigger a single light on the tree, and how would we keep track of the total donations?

For the first, we decided that a donation of £1 should be the trigger, and Andrew Williams did some very clever work with that. First, he modelled a bespoke coin chute and pivot trigger that could depress a small switch used later in the circuitry, and then fine-tuned that with weights on the trigger so that only the weight of a £1 coin would set it off. This was especially important, as there are other coins that will fit into a slot that size, and we wanted an automated way to calculate the donations.

My part in the build was to get the lights working in conjunction with the matrix display and the trigger switch, using an Arduino. I first built code around the LED display, making a simple loop that allowed for varying messages to be triggered from either a donation, or as a random message to show when the tree wasn't being interacted with.

Getting this far highlighted another problem: what if the Arduino lost power or had to be cycled during the time the tree was up? It would need to have a way to save and read the current total of donations it had taken, so we thought the best way for that was via an ethernet shield connected to the network. A couple of PHP scripts and a database later, and it was capable of saving and reading the totals, and it also allowed me to be remotely appraised of the trees progress.

Once that was completed, I had to integrate the lights (quite an important part of a Christmas tree!), and Andrew again helped out with some code for this using a sample he'd written to interact with them. The lights themselves were a strip of 150 RGB LEDs that could be individually coloured and switched on, perfect for the job at hand as it let us light the tree exactly the colour we wanted. I even added a little flashing light effect to the LED that was lit as a result of the donation which flashed only as long as the Arduino was awaiting a response back from the network after recording a new donation.

## The final result

Once the pieces were finally assembled the tree was turned on and everything was working. We made one final amendment to the flashing LED effect to make it stand out more by having the entire set flash, which was much more visually appealing. A little Christmas tune wouldn't have gone amiss here as a wonderful accompaniment to the light show, and this is certainly on somebody’s list next year. The project was developed with the future in mind, and we hope to turn this into a TMW tradition for every year.

In total we raised £109 for Shelter, and built something that was a challenging but brilliant union of physical and digital. I learnt a lot in the process, not least of which about how to correctly decorate a Christmas tree (with all that technical component integration being a close second!), and feel we definitely embraced the spirit of Christmas, showing that we really do give a damn.

Here are some breakdowns of the data we collected from the total donations:

-Donations by Hour
Some peaks over breakfast and lunch

<img src="/img/blog/tmw-shelter-christmas-tree/donations_by_hour.png" alt="Donations by Hour">

-Donations by Day

<img src="/img/blog/tmw-shelter-christmas-tree/donations_by_day.png" alt="Donations by Day">