window.$      = window.jQuery = require('jquery');
window.Swiper = require('swiper');
require('popper.js');
require('bootstrap');
require('./libs/jquery.paroller.min');
require('nicescroll');
var WOW                    = require('wowjs').WOW;
var AppNav                 = require('./partials/AppNav');
var swiperInit             = require('./partials/swiperInit');
var MixItUpInit            = require('./partials/MixItUpInit');
var parollerInit           = require('./partials/parollerInit');
var stickySocial           = require('./partials/stickySocial');
var VideoOverlay           = require('./partials/videoOverlay');
var smoothScroll           = require('./partials/smoothScroll');
var clipboardInit          = require('./partials/clipboardInit');
var animateCssInit         = require('./partials/animateCssInit');
var niceScrollInit         = require('./partials/niceScrollInit');
var navChangeEvent         = require('./partials/navChangeEvent');
var googleMapDisableScroll = require('./partials/googleMapDisableScroll');

(function ($) {
	$(window).on('load', () => {
		animateCssInit();
		new WOW({ live: false }).init();
		$('.preloader').animateCss('fadeOut faster', function () {
			$('.preloader').remove();
			$('body').removeClass('preloader-shown');
		});
	});
	$(document).ready(() => {
		$('body').addClass('preloader-shown');
		new AppNav({speed: 'fast', animation: 'fade', entrance_direction: 'right', exit_direction: 'right'});
		swiperInit();
		parollerInit();
		MixItUpInit();
		$('[data-toggle="tooltip"]').tooltip();
		stickySocial();
		new VideoOverlay();
		smoothScroll();
		// niceScrollInit();
		navChangeEvent();
		clipboardInit();
		googleMapDisableScroll();
	});
})(jQuery);
