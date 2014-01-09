#SwiftClick

As many of you will have experienced when using touch devices such as iPhones, clicking on HTML elements sometimes feels a bit sluggish. This is because there is a 300ms delay before click events are fired. This is simply not an acceptable user experience and so the exploration of potential solutions to this problem worked its way into our labs here at TMW. Since the issue only occurs on devices that support touch events our initial approach was to simply run a basic test for touch support and use a variable for the event name to use in click listeners – the value of which being either 'touchstart' for devices that support touch, or 'click' for those that don't:

		var clickEventType = "ontouchstart" in window ? "touchstart" : "click";

The problem with this detection method is that laptops or monitors that support touch would expect a touch event, meaning that if a mouse was being used then click events wouldn't work. Because of this the detection method was refined to also check if the device supports orientation change and only use touch events if both conditions are met:

		var clickEventType = "onorientationchange" in window && "ontouchstart" in window ? "touchstart" : "click";

This detection method worked well in the majority of situations we needed.

We would then use the 'clickEventType' variable in any event listeners that needed to get a click event:


		someEl.addEventListener (clickEventType, fn, false);


This worked pretty nicely, with the main drawback being the fact that we would need to ensure the 'clickEventType' variable was used anywhere we needed to add a click listener, which can be problematic when projects are picked up by new developers who may not necessarily realise that this variable is being used at all.


Other options were explored and we started to use a really nice utility called [FastClick](https://github.com/ftlabs/fastclick), developed by [FT Labs](https://github.com/ftlabs). FastClick hijacks regular click events and turns them into touch events when necessary. This allows JavaScript event listeners to be registered using the normal 'click' event type. For the most part this worked really well, but we eventually began to find that the util sometimes exhibited strange behaviour, such as events not firing when links were clicked and then firing later on, at the same time as other click events when different elements were clicked. And at 25kb non-minified (2349 bytes minified & gzipped) it is also quite heavy in file size when considering the simple way in which we needed to use it. We therefore felt the time was right to create our own solution – [SwiftClick](https://github.com/tmwagency/swiftclick).

SwiftClick is heavily based on FastClick, but was designed to be super lightweight — weighing in at a mere 5KB non-minified and a teeny-tiny 374 bytes minified & gzipped!

In contrast with FastClick, which does a lot under the hood to fix obscure browser bugs for complex elements like form, select, and textarea, by default SwiftClick focuses on basic element types that are typically used in modern interactive development and so these bugs are not a big concern.


###Usage

Including SwiftClick in your application is very easy, and mirrors the process used by FastClick in that it must be attached to a context element. Click events from all elements within the context element are automatically captured and converted to touch events when necessary.

if support is required for IE8 and below then a shim must be added for 'addEventListener'.


####Include SwiftClick in your application
    <script type="application/javascript" src="path/to/swiftclick.min.js"></script>


####Approach 1
Attach SwiftClick to any element you want to use as a context for tracking click events.
document.body is easiest if you only need a single instance of SwiftClick:

    SwiftClick.attach (document.body);


####Approach 2

Create a reference to a new instance of SwiftClick using the 'attach' helper method and attach it to a context element.
This approach allows you to create multiple instances of SwiftClick on, for example, specific container elements such as navigation, and also exposes the public API:

    var swiftclick = SwiftClick.attach (someElement);


####Approach 3

This approach is the same as approach 2, but just uses the 'new' keyword instead of SwiftClick's 'attach' method.

	var swiftclick = new SwiftClick (someElement);

		
####Default Elements
Once attached, by default SwiftClick will track events originating from the following element types:

- a
- div
- span
- button


####Adding non-default element types
If necessary you can make SwiftClick track events originating from additional element types by adding an array of node names. This requires a reference to an instance of SwiftClick:

    var swiftclick = new SwiftClick (someElement);
    
    swiftclick.addNodeNamesToTrack (["p", "h1", "nav"]);

####Replacing all stored node names to track

		var swiftclick = new SwiftClick (someElement);
		swiftclick.replaceNodeNamesToTrack (["a", "div"]);

Doing this will remove all default node names, as well as any that have been added, and replace them with the node names within the array that is passed in, resulting in only the new node names being tracked.


####Automatically disabled when not needed
SwiftClick only intercepts events for touch devices that support orientation change, otherwise it just sits there looking pretty.


###Credits
SwiftClick was developed by [Ivan Hayes](https://twitter.com/munkychop).