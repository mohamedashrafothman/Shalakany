window.$ = window.jQuery = require('jquery');
require('popper.js');
require('bootstrap');
require('./libs/jquery.paroller.min');
var WOW            = require('wowjs').WOW;
var sideNav        = require('./partials/sideNav');
var swiperInit     = require('./partials/swiperInit');
var animateCssInit = require('./partials/animateCssInit');
var parollerInit = require('./partials/parollerInit');

(function ($) {
	$(window).on('load', () => {
		animateCssInit();
		$('.preloader').animateCss('fadeOut faster', function () {
			$('.preloader').removeClass('d-flex').addClass('d-none');
			$('body').removeClass('preloader-shown');
		})
		new WOW({live:false}).init();
	});
	$(document).ready(() => {
		$('body').addClass('preloader-shown');
		sideNav({speed: '', animation: 'fade', entrance_direction: 'right', exit_direction: 'right'});
		swiperInit();
		parollerInit();
	});
})(jQuery);
