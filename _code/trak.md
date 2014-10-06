---
layout: code
title: trak.js (beta)
subtitle: Universal event tracking API
pageid: code
demo: demo.html
img: http://ashleynolan.co.uk/assets/img/work/work-kickoff.jpg
github_url: https://github.com/tmwagency/trak.js
issues: https://github.com/tmwagency/trak.js/issues
team:
- zander

weight: 4
---

**trak.js** is a API wrapper for your analytics APIs. By default it uses the Google Universal Analytics but you can override this with the older ga.js or Google Tag Manager if you wish. You can even add custom event trackers as well as, or instead of GA.

## Getting the Library
### Direct downloads
- [Minified](https://raw.githubusercontent.com/tmwagency/trak.js/master/dist/trak.min.js) (~481 B gzipped)
- [Unminified](https://raw.githubusercontent.com/tmwagency/trak.js/master/dist/trak.js) (~1.7 KB gzipped)

### Bower
`bower install trak`

## Usage:
Include **trak.js** in your JavaScript bundle or add it to your HTML page like this:

```html
<script type='application/javascript' src='/path/to/trak.js'></script>
```
then run `trak();` when the DOM is ready:

```js
// Native JS
document.addEventListener('DOMContentLoaded', function(e) {
	trak();
}

// jQuery
$(function(){
	trak();
});
```

# API Reference
There are two main ways to use **trak.js**, in your js code or as data-* attributes in your markup.

## JS implementation:
### trak.event(category, action, label [, options])

Fires an analytics event

#### Arguments:
*category*: A string value of the category value to set<br>
*action*: A string value of the action value to set<br>
*label*: A string value of the label value to set<br>
*extendedOptions*: An object containing additional parameters for more advanced analytics events.

#### The 'extendedOptions' Object:
*value*: An integer<br>
*nonInteraction*: An integer<br>
*eventName*: A string value used only with Google Tag Manager. Define your GTM event name here

If any property is left `undefined`, the browser's default value will be used instead.

```js
trak.event('category', 'action');
trak.event('category', 'action', 'label');
trak.event('category', 'action', 'label', extendedOptions);
```
##### Example:

```js
trak.event('engagement', 'signpost', 'page.href');
trak.event('engagement', 'signpost', 'page.href', {
  value: 10,
  nonInteraction: true,
  eventName: 'This is a Google Tag Manager event name'
});
```

### Data-* attr implementation:

```html
<a href="#" data-trak='{"category":"Rating","action":"Comparison notepad","label":"Up"}'>link</a>

<!-- With an extended option -->
<a href="#pagehref" title="1 title" data-trak='{"category":"Test category","action":"Test action","label":"Test label","options":{"eventName":"Event name test"}}'>Data attr test #1</a>
```

## Extended options
These can be used

#### data-trak wildcards:
Wildcards can be used to specify certain options like the page title or url.
##### page.href: Uses `window.location.href`

```html
<a href="#" data-trak='{"category":"Rating","action":"page.href","label":"Up"}'>link</a>
```
##### page.title: Uses `document.title`

```html
<a href="#" data-trak='{"category":"Rating","action":"page.title","label":"Up"}'>link</a>
```
##### link.href: Uses `this.href`

```html
<a href="#" data-trak='{"category":"Rating","action":"link.href","label":"Up"}'>link</a>
```
##### link.title: Uses `this.title`

```html
<a href="#" data-trak='{"category":"Rating","action":"link.title","label":"Up"}'>link</a>
```
##### referrer: Uses `document.referrer`

```html
<a href="#" data-trak='{"category":"Rating","action":"document.referrer","label":"Up"}'>link</a>
```

---

### Options
Various default **trak.js** options can be overridden:

#### trak.options.clean
Type: `boolean`
Default: `true`

Choose whether you'd like to clean the provided category, action and labels

#### trak.options.delimeter
Type: `string`
Default: `_`

**trak.js** includes a cleaning method to normalise the arguments that are passed to it. Spaces are converted to an underscore by default but can be overridden by reassigning this value.

#### trak.options.trackType
Type: `string`
Default: `ga`
Alternatives:
* `ga` : Google Analytics (Universal
* `_gaq` : Google Analytics (ga.js) Old version
* `gtm` : Google Tag Manager

Use this to change your default tracking provider.

#### trak.options.additionalTypes
Type: `function`
Default: `undefined`

Add any other event tracking providers. See below for example:

```js
trak.options.additionalTypes = function() {
	UDM.evq.push(['trackEvent', trak.clean(category), trak.clean(action)]); // trak.clean(label)
	console.log('Fire additional event');
}
```

#### trak.options.debug
Type: `boolean`
Default: `false`

Show debug logs in the js console

---

## Which tracking API's are used?
The default implementation uses latest version of Google Analytics (`ga.js`) but **trak.js** also supports the older `_gaq` type or Google Tag Manager.

---
## Browser Compatibility
trak.js has been tested in the following browsers:
- Chrome
- Firefox 3+
- Opera 10+
- Internet Explorer 8+