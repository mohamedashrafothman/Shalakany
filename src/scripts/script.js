window.$ = window.jQuery = require('jquery');
require('popper.js');
require('bootstrap');
require('./libs/jquery.paroller.min');
var WOW            = require('wowjs').WOW;
var AppNav         = require('./partials/AppNav');
var swiperInit     = require('./partials/swiperInit');
var animateCssInit = require('./partials/animateCssInit');
var parollerInit   = require('./partials/parollerInit');
var MixItUpInit    = require('./partials/MixItUpInit');
var stickySocial   = require('./partials/stickySocial');
var VideoOverlay   = require('./partials/videoOverlay');

(function ($) {
	$(window).on('load', () => {
		animateCssInit();
		$('.preloader').animateCss('fadeOut faster', function () {
			$('.preloader').remove();
			$('body').removeClass('preloader-shown');
		})
		new WOW({live:false}).init();
	});
	$(document).ready(() => {
		$('body').addClass('preloader-shown');
		new AppNav({speed: 'slower', animation: 'fade', entrance_direction: 'right', exit_direction: 'right'});
		swiperInit();
		parollerInit();
		MixItUpInit();
		$('[data-toggle="tooltip"]').tooltip();
		stickySocial();
		new VideoOverlay();
	});
})(jQuery);
