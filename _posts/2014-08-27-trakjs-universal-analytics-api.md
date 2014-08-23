---
comments: true
layout: post
title: "trak.js - Tracking event nirvana"
author: zander
excerpt: Add tracking events more easily with this new library
---
Whether you use Google Analytics or another provider, adding tracking events to a site is always a painful experience. Events have to be defined in javascript which can make it tricky to dynamically change parameters based on certain criteria. Wouldn't it be nice to define events within the markup so that hundreds of click events can be left free from your javasript code? Trak.js does just that.

**trak.js** is an API wrapper for your analytics APIs. By default it uses the Google Universal Analytics but you can override this with the older ga.js or Google Tag Manager if you wish. You can even add custom event trackers as well, instead of GA.

## Using trak.js
There are two main ways to use trak.js, as data-* attributes in your markup or in your js code.

### data-* attr implementation:
```html
<a href="#" data-trak='{"category":"Rating","action":"Comparison notepad","label":"Up"}'>link</a>

<!-- With extended options -->
<a href="#pagehref" title="1 title" data-trak='{"category":"Test category","action":"Test action","label":"Test label","options":{"eventName":"Event name test"}}'>Data attr test #1</a>
```

### Javascript implementation
```js
trak.event('category', 'action');
trak.event('category', 'action', 'label');
trak.event('category', 'action', 'label', extendedOptions);
```

## API Reference

#### Arguments:
* *category*: A string value of the category value to set<br>
* *action*: A string value of the action value to set<br>
* *label*: A string value of the label value to set<br>
* *extendedOptions*: An object containing additional parameters for more advanced analytics events.

#### The 'extendedOptions' Object:
* *value*: An integer<br>
* *nonInteraction*: An integer<br>
* *eventName*: A string value used only with Google Tag Manager. Define your GTM event name here

If any property is left `undefined`, the browser's default value will be used instead.

## data-trak wildcards:
Wildcards can be used to specify certain options like the page title or url.

* **`page.href`** wildcard uses `window.location.href` as the value.
* **`page.title`** wildcard uses `document.title` as the value.
* **`link.href`** wildcard uses `this.href` as the value.
* **`link.title`** wildcard uses `this.title` as the value.
* **`referrer`** uses `document.referrer` as the value

```html
<!-- page.href wildcard -->
<a href="#" data-trak='{"category":"Rating","action":"page.href","label":"Up"}'>link</a>
<!-- page.title wildcard -->
<a href="#" data-trak='{"category":"Rating","action":"page.title","label":"Up"}'>link</a>
<!-- link.href wildcard -->
<a href="#" data-trak='{"category":"Rating","action":"link.href","label":"Up"}'>link</a>
<!-- link.title wildcard -->
<a href="#" data-trak='{"category":"Rating","action":"link.title","label":"Up"}'>link</a>
<!-- referrer wildcard -->
<a href="#" data-trak='{"category":"Rating","action":"document.referrer","label":"Up"}'>link</a>
```


## More information
More information and the full documentation can be found at our repository on [Github](https://github.com/tmwagency/trak.js). Options can be overridden; debugging can be toggled; and most importantly, other analytics APIs can be included.
