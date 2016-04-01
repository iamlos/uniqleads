;(function ( $, window, document, undefined ) {
	// Create the defaults once
	var pluginName = "scroggler",
		_ticking = false,
		_latestKnownScrollY = 0,
		defaults = {
			className: "is-sticky",
			fixFrom: 'auto',
			fixTo: undefined,
			beforeToggle: function() {}
		};

	// The actual plugin constructor
	function Plugin( el, options ) {
		this.$el = $(el);
		
		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {
		init: function() {
			if(this.options.fixFrom === 'auto') {
				$(window)
					.one('load', this.fixFrom.bind(this, this.$el.offset().top))
					.one('load', function() { $(window).trigger('scroll') });
			} else if(this.options.fixFrom < 0) {
				$(window).one('load', function() {$(window).trigger('scroll')})
			}
			$(window).on('Katoen:ScrollEvent', function(e) { this.toggleSticky(e.latestKnownScroll.top, e.latestKnownScroll.bottom) }.bind(this));
		},
		toggleSticky: function(top, bottom) {
			//Makes no sense to toggle if fixfrom is still auto.
			if(this.options.fixFrom != 'auto') {
				var	leave = top > this.options.fixTo;  //+ this.options.offset
				var enter = top > this.options.fixFrom && !leave; // - this.options.offset
				if (typeof this.options.className === 'string') {
					this.$el.toggleClass(this.options.className, enter && leave);
				} else {
					this.$el.toggleClass(this.options.className.enter, enter);
					this.$el.toggleClass(this.options.className.leave, leave);
				}
			} 
		},

		fixFrom: function(val) {
			if(val) {
				this.options.fixFrom = val;
				return this.$el;
			} else {
				return this.options.fixFrom;
			}
		}
	};
	$.fn[pluginName] = function ( options ) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			return this.each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
				}
			});
		} else if (typeof options === 'string') {
			var returns;
			this.each(function () {
				var instance = $.data(this, 'plugin_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
				} else {
					returns = console.error("No such method",options,"for",pluginName);		
				}
				if (options === 'destroy') {
				  $.data(this, 'plugin_' + pluginName, null);
				}
			});
			return returns !== undefined ? returns : this;
		}
	};
})( jQuery, window, document );