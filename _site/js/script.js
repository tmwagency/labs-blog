/*	Author:
		TMW - (Author Name Here)
*/


// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f() {
	log.history = log.history || [];
	log.history.push(arguments);
	if (this.console) {
		var args = arguments,
				newarr;
		try {
				args.callee = f.caller;
		} catch (e) {}
		newarr = [].slice.call(args);
		if (typeof console.log === 'object')  {
			log.apply.call(console.log, console, newarr);
		} else {
			console.log.apply(console, newarr);
		}
	}
};

//alows bind for ie9<
if(!function(){}.bind){
  Function.prototype.bind = function(){
	var me = this
	, shift = [].shift
	, he = shift.apply(arguments)
	, ar = arguments
	return function(){
	  return me.apply(he, ar);
	}
  }
}

/*globals Element:true, NodeList:true*/
$ = (function (document, $) {
	var element = Element.prototype,
		nodeList = NodeList.prototype,
		forEach = 'forEach',
		trigger = 'trigger',
		each = [][forEach],

		dummyEl = document.createElement('div');

	nodeList[forEach] = each;

	element.on = function (event, fn) {
		this.addEventListener(event, fn, false);
		return this;
	};

	nodeList.on = function (event, fn) {
		each.call(this, function (el) {
			el.on(event, fn);
		});
		return this;
	};

	element.trigger = function (type, data) {
		var event = document.createEvent('HTMLEvents');
		event.initEvent(type, true, true);
		event.data = data || {};
		event.eventName = type;
		event.target = this;
		this.dispatchEvent(event);
		return this;
	};

	nodeList.trigger = function (event) {
		each.call(this, function (el) {
			el[trigger](event);
		});
		return this;
	};

	$ = function (s) {
		var r = document.querySelectorAll(s || '☺'),
			length = r.length;
		return length == 1 ? r[0] : !length ? null : r;
	};

	$.on = element.on.bind(dummyEl);
	$.trigger = element[trigger].bind(dummyEl);

	return $;
})(document);


// Create a closure to maintain scope of the '$' and TMW
;(function (TMW) {

	TMW.Blog = {
		variableX : '', // please don't keep me - only for example syntax!

		init : function () {
			this.externalLinks();
		},

		externalLinks : function () {

			if (!document.getElementsByTagName) return;
			var content = $('.content');
			if (content === null) return

			var anchors = content.getElementsByTagName("a");
			for (var i=0; i<anchors.length; i++) {
				var anchor = anchors[i];
					if (anchor.getAttribute("href")) {
						anchor.target = "_blank";
					}
			}

		}
	};

})(window.TMW = window.TMW || {});

TMW.Blog.init();


