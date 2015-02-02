---
comments: true
layout: post
title: Accessible Cross Reference Tables
author: asheridan
excerpt: Making traditional cross-reference tables available in an accessible manner
---

Cross-reference tables are a great tool to visually illustrate information quickly, and they're very easy to understand - if you can see them. I wanted to create such a table that was accessible on as many levels as possible, while still retaining the same look.

Thankfully, there have been many accessibility advances in traditional HTML tables that we can use for just such a task, and the particular tool I decided to use for this was the <code>headers</code> attribute of the <code>&lt;td></code> and <code>&lt;th></code> tags.

Consider a typical cross-reference table where you're listing your preference for several TV shows:

<table class="table table--bordered">
<tr>
	<td></td><th>Great</th><th>It's ok</th><th>Awful</th>
</tr>
<tr>
	<th>Firefly</th><td>x</td><td></td><td></td>
</tr>
<tr>
	<th>Game of Thrones</th><td></td><td>x</td><td></td>
</tr>
<tr>
	<th>Vikings</th><td>x</td><td></td><td></td>
</tr>
<tr>
	<th>The Only Way is Essex</th><td></td><td></td><td>x</td>
</tr>
</table>

Visually, this is readable and simple, but imagine this going through a screen reader. There's no correlation between the headings and row data, and the 'x' has no symantic meaning. In other words, it's not accessible.

The first step to making it better is to give the top row of heading cells an id each:

```html
<tr>
	<td></td>
	<th id="tv_great">Great</th>
	<th id="tv_ok">It's ok</th>
	<th id="tv_awful">Awful</th>
</tr>
```

The W3 gives an example of how this could be used at [http://www.w3.org/TR/WCAG20-TECHS/H43.html](http://www.w3.org/TR/WCAG20-TECHS/H43.html), which associates every cell with a heading. We don't want that, as most of the cells will contain no data. As such, each row pertaining to a show will look like this:

```html
<tr>
	<th>Firefly</th>
	<td headers="tv_great">x</td>
	<td></td>
	<td></td>
</tr>
```

Now we have a proper relationship between data cells and their headers.

The next step in the process is to resolve that ambiguous 'x' used in the cells. Symantically, it has no meaning, and something better would be the word 'yes':

```html
<tr>
	<th>Firefly</th>
	<td headers="tv_great">yes</td>
	<td></td>
	<td></td>
</tr>
```

However, now that's made our table look strange, and not aesthetically appealing:

<table class="table table--bordered">
<tr>
	<td></td><th>Great</th><th>It's ok</th><th>Awful</th>
</tr>
<tr>
	<th>Firefly</th><td>yes</td><td></td><td></td>
</tr>
<tr>
	<th>Game of Thrones</th><td></td><td>yes</td><td></td>
</tr>
<tr>
	<th>Vikings</th><td>yes</td><td></td><td></td>
</tr>
<tr>
	<th>The Only Way is Essex</th><td></td><td></td><td>yes</td>
</tr>
</table>

It's a simple matter of some CSS though to bring the table back to something that works better visually:

```css
table.cross_ref td[headers]
{
	text-margin: -999em;
	background-image: url(tick.png);
	background-repeat: no-repeat;
	background-size: auto 100%;
	background-position: center;
}
```

Making our final table look like this:

<table class="cross_ref table table--bordered">
<tr>
	<td></td><th>Great</th><th>It's ok</th><th>Awful</th>
</tr>
<tr>
	<th>Firefly</th>
	<td headers="tv_great">yes</td>
	<td></td>
	<td></td>
</tr>
<tr>
	<th>Game of Thrones</th>
	<td></td>
	<td headers="tv_ok">yes</td>
	<td></td>
</tr>
<tr>
	<th>Vikings</th>
	<td headers="tv_great">yes</td>
	<td></td>
	<td></td>
</tr>
<tr>
	<th>The Only Way is Essex</th>
	<td></td>
	<td></td>
	<td headers="tv_awful">yes</td>
</tr>
</table>
<style>
table.cross_ref td[headers]
{
	text-indent: -999em;
	background-image: url(/img/blog/accessible-cross-reference-tables/tick.png);
	background-repeat: no-repeat;
	background-size: auto 100%;
	background-position: center;
}
</style>