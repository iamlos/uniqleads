;(function ( $, window, document, undefined ) {
	"use strict";
	var pluginName = "responsiveMenu",
		defaults = {
			maxHeight: 61
		};

	function Plugin ( element, options ) {
		this.$el = $(element);
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function () {
			this.setEventListeners();
			this.onResize();
		},
		setEventListeners: function() {
			$(window).on('Katoen:ResizeEvent', this.onResize.bind(this))
		},
		onResize: function(e) {
			var currW = e && e.width ? e.width : $(window).width();
			
			//Remove classname so we can properly calculate the (potentially new) height
			this.$el
				.removeClass('is-hidden')
				.find('.js-menu').addClass('xs-hide');
			//Is the whole of the menu container larger than the navigation items?
			var bool = this.$el.outerHeight() > this.settings.maxHeight;
			//Show menu button
			this.$el.find('.js-menu').toggleClass('xs-hide', !bool);
			this.$el.toggleClass('is-hidden', bool);
		}
	});

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
		});
	};
})( jQuery, window, document );
