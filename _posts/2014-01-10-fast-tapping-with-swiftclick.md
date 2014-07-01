---
comments: true
layout: post
title: Faster tapping with SwiftClick
date: 2014-01-10 11:00:00
categories:
  - "front-end"
  - touch devices
author: ihayes
excerpt: "SwiftClick is a library created to eliminate the 300ms click event delay on touch devices that support orientation change and is designed to be super lightweight — weighing in at a teeny-tiny 417 bytes minified & gzipped!"
published: true
---
As many of you will have experienced when using touch devices such as iPhones, tapping on HTML elements sometimes feels a bit sluggish. This is because there is a [300ms delay](http://updates.html5rocks.com/2013/12/300ms-tap-delay-gone-away) before click events are fired. As a user experience this is clunky behaviour and so the exploration of potential solutions to this problem worked its way into our labs here at TMW. Since the issue only occurs on devices that support touch events our initial approach was to simply run a basic test for touch support and create a variable for the event name to use in click listeners – the value of which being either 'touchstart' for devices that support touch, or 'click' for those that don't:

```js
var clickEventType = "ontouchstart" in window ? "touchstart" : "click";
```

The problem with this detection method is that laptops or monitors that support touch would expect a touch event, meaning that if a mouse was being used then click events wouldn't work. Because of this the detection method was refined to check if the device supports both touch and orientation change and only use touch events if both conditions are met:

```js
var clickEventType = "onorientationchange" in window && "ontouchstart" in window ? "touchstart" : "click";
```

This detection method worked well in the majority of situations we needed.

We would then use the `'clickEventType'` variable in any event listeners that needed to get a click event:

```js
someEl.addEventListener(clickEventType, fn, false);
```

This worked pretty nicely, with the main drawback being the fact that we would need to ensure the 'clickEventType' variable was used anywhere we needed to add a click listener, which can be problematic when projects are picked up by new developers who may not necessarily realise that this variable is being used at all.

Other options were explored and we started to use a really nice utility called [FastClick](https://github.com/ftlabs/fastclick), developed by [FT Labs](https://github.com/ftlabs). FastClick hijacks regular click events when necessary, converts them to touch events and then fires a synthesised click event. This allows JavaScript event listeners to be registered using the normal 'click' event type, but has the advantage of these events being fired earlier than normal – effectively removing the 300ms delay. For the most part this worked really well, but we eventually began to find that the util sometimes exhibited strange behaviour, such as events not firing when links were clicked and then firing later on, at the same time as other click events when different elements were clicked. And at 25kb non-minified (1441 bytes minified & gzipped) it is also quite heavy in file size when considering the simple way in which we needed to use it. We therefore felt the time was right to create our own solution – [SwiftClick](https://github.com/tmwagency/swiftclick).

SwiftClick is heavily based on FastClick, but was designed to be super lightweight — weighing in at a mere 5KB non-minified and a teeny-tiny 417 bytes minified & gzipped!

In contrast with FastClick, which does a lot under the hood to fix obscure browser bugs for complex elements like form, select, and textarea, by default SwiftClick focuses on basic element types that are typically used in modern interactive development and so these bugs are not a big concern.

##Usage

Firstly, grab either the [minified](https://raw2.github.com/tmwagency/swiftclick/master/js/dist/swiftclick.min.js), or [non-minified](https://raw2.github.com/tmwagency/swiftclick/master/js/libs/swiftclick.js) source from Github, or install via Bower using the following command in your command prompt:

```sh
bower install swiftclick
```

###Include SwiftClick in your application
```html
<script type="application/javascript" src="path/to/swiftclick.min.js"></script>
```

###Setup SwiftClick

Setting up SwiftClick is a very easy process, which mirrors that of FastClick in that instances must be attached to a context element. Click events from all elements within the context element are automatically captured and converted to touch events when necessary.

Start by creating a reference to a new instance of SwiftClick using the 'attach' helper method and attach it to a context element. Attaching to document.body is easiest if you only need a single instance of SwiftClick:

```js
var swiftclick = SwiftClick.attach(document.body);
```

If necessary, multiple instances of SwiftClick can be created for specific context elements which, although not really necessary in most cases, can sometimes be useful for optimising applications with a large amount of HTML:

```js
var navigationSwiftClick = SwiftClick.attach(someNavElement);
var uiSwiftClick = SwiftClick.attach(someOtherElement);
```

###Default Elements
Once attached, by default SwiftClick will track events originating from the following element types:

- `<a>`
- `<div>`
- `<span>`
- `<button>`


###Adding non-default element types
If necessary you can make SwiftClick track events originating from additional element types by adding an array of node names. This requires a reference to an instance of SwiftClick:

```js
var swiftclick = SwiftClick.attach (someElement);
swiftclick.addNodeNamesToTrack (["p", "h1", "nav"]);
```

###Replacing all stored node names to track

```js
var swiftclick = SwiftClick.attach (someElement);
swiftclick.replaceNodeNamesToTrack (["a", "div"]);
```

Doing this will remove all default node names, as well as any that have been added, and replace them with the node names within the array that is passed in, resulting in only the new node names being tracked.


###Automatically disabled when not needed
SwiftClick only intercepts events for touch devices that support orientation change, otherwise it just sits there looking pretty.

##About the Project
SwiftClick was developed and is currently maintained by [Ivan Hayes](https://twitter.com/munkychop).

Head over to the Github [project page](https://github.com/tmwagency/swiftclick) to find out more. Go ahead and star the project to keep up with its latest developments :-)

