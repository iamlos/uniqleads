;(function($, window, document, undefined) {
	var resizeTimeout, //Store this variable so we can reset it inside of a function
		_animRunning = false,
		_height = $(window).height(),
		_width = $(window).width(),
		_prevTop = 0, //Previous top to compare with the new top position
		//store latest known position
		latestKnownScroll = {
			top: 0,
			bottom: _height
		};

// *******************************************************************************
// * RESIZE EVENT PERF OPTIMISATIONS USING TIMEOUT (not recal frame)
// *******************************************************************************
	//Add handlers
	$(window)
		.on('scroll', scrollThrottler)
		.on('resize',resizeThrottler)
		.on("Katoen:ResizeEvent", function(e) {
			_height = e.height;
			_width = e.width;
		});

	function resizeThrottler() {
		//Resets the timeout and start over with the delay
	  	window.clearTimeout(resizeTimeout);
		// ignore resize events as long as an actualResizeHandler execution is in the queue
		resizeTimeout = setTimeout(function() {
			actualResizeHandler();
			// The actualResizeHandler will execute at a rate of 	3,5fps
		}, 244);
	}

	function actualResizeHandler() {
		var query = false;
		//Stores current media query in a variable
		document.currMedia = function() {
			var tag = window.getComputedStyle(document.body,':after').getPropertyValue('content'),
				tag = tag.replace( /["']/g,'');
				
			if(tag != document.currMedia) {	query = true; }
			return tag;
		}();
		//Changed breakpoint, trigger queryevent
		if(query) {
			$(window).trigger({
				type: "Katoen:QueryEvent",
				query: document.currMedia
			});
		}
		// handle the resize event
		$(window).trigger({
			type: "Katoen:ResizeEvent", 
			height: _height,
			width: _width 
		});
	};
// *******************************************************************************
// * SCROLL EVENT PERF OPTIMISATIONS
// *******************************************************************************
	// POLYFILL FOR REQUESTANIMATIONFRAME BY PAUL IRISH
	// Found here: http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	if (!Date.now)
		Date.now = function() { return new Date().getTime(); };

	(function() {
		var vendors = ['webkit', 'moz'];
		for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
			var vp = vendors[i];
			window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
			window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
									   || window[vp+'CancelRequestAnimationFrame']);
		}
		if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
			|| !window.requestAnimationFrame || !window.cancelAnimationFrame) {
			var lastTime = 0;
			window.requestAnimationFrame = function(callback) {
				var now = Date.now();
				var nextTime = Math.max(lastTime + 16, now);
				return setTimeout(function() { callback(lastTime = nextTime); },
								  nextTime - now);
			};
			window.cancelAnimationFrame = clearTimeout;
		}
	}());
	// END POLYFILL FOR REQUESTANIMATIONFRAME

	function scrollThrottler(e) {
		//From: https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
		//Store last known scroll position because we need to determine scrolldirection on paint
		latestKnownScroll.top = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		latestKnownScroll.bottom = latestKnownScroll.top + _height;
		
		//Prevent multiple events firing
		if(_animRunning) return;
		
		_animRunning = true;
		window.requestAnimationFrame(actualScrollHandler);
		
	}

	//Allright! We're able to trigger a event
	function actualScrollHandler () {
		_direction = latestKnownScroll.top < _prevTop? "up" : "down";
		_prevTop = latestKnownScroll.top;

		$(window).trigger({
			type: "Katoen:ScrollEvent",
			latestKnownScroll: latestKnownScroll,
			direction: _direction
		});
		_animRunning = false;
	}
})(jQuery, window, document);