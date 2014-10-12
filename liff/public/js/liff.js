var liffFrontEnd = (function () {
	"use strict";
	return {
		Initialise: function () {

			liffFrontEnd.Navigation();

		},

		Navigation: function () {

			$('.search-link').on('click', function ( e ) {
				e.preventDefault();
				$( document.body ).toggleClass( 'search-open' );
			});

		},

	};
}());

$(liffFrontEnd.Initialise);