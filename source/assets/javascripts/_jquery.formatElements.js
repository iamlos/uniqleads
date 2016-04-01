;(function ( $, window, document, undefined ) {
	$.fn['formatElements'] = function(options) {

		switch(options) {
			case 'destroy':
				//Destroy events/objects so garbage collection can get to it
				$(".select", this).each(function() {
					$("select", this)
						.off()
						.data('formatted', null)
				});
			break;
			default:
				//CUSTOM SELECT WRAPPING STUFF
				$("select", this).each(function() {
					if(!$(this).data('formatted')) {
						var val = $(this).children("option:selected").text(),
							$this = $(this);

						$this
							.wrap('<div class="select '+this.className+'">') //Wrap with div and replace classnames
							.attr('class', null) //remove classnames from select
							.after('<div class="select__text">') //insert placeholder div for text replacement trick
							.next().text(val) //update text ton select__text
							.end() //return to select box
							//Event listener on change
							.on('change', function(e) {
								var selectedOption = $(this).children('option:selected');

								// set visible selected item
								$(this).next('.select__text').text(selectedOption.text());
							})
							.data('formatted', true); //set boolean to ensure it's only formatted once
					}
				});
			break;
		}
		return $(this);
	};
})( jQuery, window, document );