---
comments: true
layout: post
title: Hyping the iBeacon
date: 2014-01-20 15:30:00
categories:
  - technology
author: awilliams
excerpt: "We take a look at the much talked about iBeacon, a new technology pioneered by Apple that could revolutionise contextual mobile use."
published: true
---

## What are iBeacons?

Lately there has been much talk about iBeacons. A technology pioneered by Apple, they allow small hardware modules, called beacons, to broadcast their location to nearby BLE (Bluetooth Low Energy) equipped mobile devices. The result? Mobile apps that interact with iBeacons become contextually aware.

In other words, the app knows where its user is located at a micro–location level, providing a vast array of opportunities to create personalised experiences that transcend the physical and digital worlds.

<img src="/img/blog/hyping-the-ibeacon/ibeacons-in-context.jpg" alt="iBeacon ranging for proximity and position">

## Features

Imagine a user has spent some time looking at a product on a retail brand’s website, but has never followed through with a purchase.

A week later they walk into the same retail brand’s physical store where iBeacons are installed and see the product in the flesh. On walking into the iBeacon broadcast region a service running on the user's phone fires up an app offering them a discount on the product in an attempt to encourage a sale.  This "***monitoring***" feature of iBeacons allows contextual content to be delivered even if the relevant app isn't running, or is running in the background.

Another feature of iBeacons is "***ranging***"; the ability for the mobile device to work out its distance from the iBeacon using the received signal strength. Furthermore, if the app is simultaneously connected to multiple beacons then it can triangulate distances and work out where a user is within a space: micro-location. Suddenly an app knows whether the user is looking at jeans or perfume, which could lead to great opportunities for real-life, real-time analytics.

<img src="/img/blog/hyping-the-ibeacon/ibeacons-proximity-ranging.jpg" alt="iBeacon ranging for proximity and position">


## Limitations

iBeacons broadcast nothing more than three identifiers. They cannot push custom content to the users phone, so for any value to come from the presence of an iBeacon a user must have an app installed that is listening for that particular iBeacon.

There are also currently some [security concerns](http://blogs.computerworld.com/mobile-security/23256/what-apples-ibeacon-rollout-doesnt-say) that rogue apps could potentially be used to track users.


## Adoption

We imagine that the initial uptake of iBeacons will probably happen with brands that already have customers using their apps. In this case, the brand can just roll out an update that enables contextually sensitive features and equip relevant spaces with iBeacon hardware.

Apple, of course, have included the ability to send in-store notifications (using iBeacons in Apple stores) to iOS devices in a [recent silent update](http://9to5mac.com/2013/12/06/apple-rolling-out-ibeacons-into-apple-stores-silent-app-update-enables-in-store-notifications/).

The social shopping app [Shopkick](http://www.shopkick.com/shopbeacon/) already has a wide user base and is providing a framework for [some retailers](http://techcrunch.com/2014/01/16/shopkick-starts-100-store-ibeacon-trial-for-american-eagle-outfitters-the-biggest-apparel-rollout-yet/) to get on board without needing to develop their own apps.

It’ll be interesting to see how users take to installing apps specifically to use iBeacon features as the technology becomes more ubiquitous.


## Our Interest

Because iBeacons are small, cheap and can run on a single battery for up to 2 years they can make for ideal integrations into POS displays to augment campaigns and product launches in retail environments.

They don't require an existing infrastructure to be present and can be easily deployed in any environment be it an expo, conference, tradeshow, outdoor event. They can also be placed on moving objects and aside from marketing, retail and guiding applications, there is massive potential to create [products](http://www.motionloft.com/property_owners.html) or [games](http://thetaplab.com/games/tinytycoons) that take advantage of the tech.

It is early days but with the digital world perpetually bleeding outside the confines of a screen it is an ideal territory for an agency such as ourselves to explore for opportunities.

At TMW we are planning an evening of BLE/iBeacon experimentation to get our heads around it. We have a set of [Estimote beacons](http://estimote.com/api/index.html) on order as well as some [unbranded beacons we found on eBay](http://www.ebay.co.uk/itm/281218637040?ssPageName=STRK:MEWNX:IT&_trksid=p3984.m1497.l2649), but even without these, we could simply use [iOS devices](http://blog.estimote.com/post/57087873876/a-simple-way-to-simulate-apple-ios7-ibeacon-feature), a Raspberry Pi or a hacked BLED112 USB Dongle as iBeacons.

Once we get our teeth stuck into these, I’ll be back with a more technically focused post, but for now, here’s a list of resources and interesting articles on iBeacons to get you as excited as we are.


## Further Reading

### General Information

* [Beekn: Beacons, brands and culture on the IoT](http://www.beekn.net/)
* [WIRED on iBeacons](http://www.wired.com/design/2013/12/4-use-cases-for-ibeacon-the-most-exciting-tech-you-havent-heard-of/)
* [iBeacons Bible](http://meetingofideas.wordpress.com/2013/12/12/download-ibeacons-bible-1-0/)


### Hardware Vendors

* [Estimote](http://estimote.com/api/index.html)
* [Redbear](http://www.redbear.net/)
* [Roximity](http://roximity.com/)
* [Kontact](http://kontakt.io/)
* [Radius Networks](http://www.radiusnetworks.com/)
* [Beaconic](http://www.beaconic.nl/en/)


### Retail & Analytics Products

* [Nomi](http://nomi.com/)
* [Shopkick](http://www.shopkick.com/shopbeacon/)

### Adoption

* [iBeacons require an app](http://recode.net/2014/01/09/so-youve-installed-an-ibeacon-system-now-comes-the-hard-part-no-one-is-talking-about/)
* [Interesting security concerns](http://venturebeat.com/2013/11/29/is-ibeacon-ready-for-prime-time-retail-three-key-considerations/)


### Development & Hacks

* [iBeacons: use cases and implementation](http://daveaddey.com/?p=1252)
* [PiBeacon: turn a Raspberry Pi into an iBeacon](http://learn.adafruit.com/pibeacon-ibeacon-with-a-raspberry-pi/overview)
* [Turn a BLED112 USB Dongle into an iBeacon](https://github.com/jamiepinkham/bled112_ibeacon_firmware)
* [Discovering Estimote Beacons](http://blog.innoquant.com/2013/12/discovering-estimote-ibeacons/)
* [iBeacon Monitoring in the Background](http://developer.radiusnetworks.com/2013/11/13/ibeacon-monitoring-in-the-background-and-foreground.html)