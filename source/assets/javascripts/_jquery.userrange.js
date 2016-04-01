;(function ( $, window, document, undefined ) {
	"use strict";
		var pluginName = "userrange",
			defaults = {
				titleElements: [],
				priceElements: [],
				featuresElements: [],
				selectorsElements: [],
				outputElement: 'jQueryObj',
				values: [],
				hiddenClassName: 'hidden'
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.$el = $(element);
			this._name = pluginName;

			this.settings = $.extend( {}, defaults, options );
			this.settings.values = this.$el.data( 'values' );
			this._defaults = defaults;
			this.init();
		}
		$.extend(Plugin.prototype, {
			init: function () {
				this.$el.on('change input', this.updateElements.bind(this));
				this.updateElements();
			},
			updateElements: function () {
				this.showElementAtIndex(this.$el.val(), this.settings.titleElements);
				this.showElementAtIndex(this.$el.val(), this.settings.priceElements);
				this.showElementAtIndex(this.$el.val(), this.settings.featuresElements);
				this.showElementAtIndex(this.$el.val(), this.settings.selectorsElements);
				this.updateOutputValue();
			},
			showElementAtIndex: function(index, list) {
				list.each(function(i) {
					if (i == index) {
						$(this).removeClass('hidden');
					} else {
						$(this).addClass('hidden');
					}
				});
			},
			updateOutputValue: function() {
				this.settings.outputElement.text(this.settings.values[this.$el.val()].toLocaleString());
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
