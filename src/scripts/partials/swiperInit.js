'use strict';

var Swiper = require('swiper');
module.exports = function () {
	function css_variable(var_name) {
		return getComputedStyle(document.documentElement).getPropertyValue(var_name);
	};
	var $single_slide_swiper = $('#home-banner-slider, #home-whatWeDo-slider');
	var $clients_swiper = $("#home-clients-slider");
	var effect_array = ["slide", "fade", "cube", "flip", "coverflow"];
	if ($single_slide_swiper.length) {
		$single_slide_swiper.each(function (index, ele) {
			var effect = ($(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect"))) ? $(ele).attr("data-swiper-effect") : "slide";
			new Swiper(`#${$(ele).attr("id")}`, {
				init: true,
				direction: 'horizontal',
				speed: 1000,
				loop: true,
				parallax: true,
				grabCursor: true,
				// autoplay: {
				// 	delay: 6000
				// },
				keyboard: {
					enabled: true,
					onlyInViewport: true
				},
				effect: effect,
				fadeEffect: {
					crossFade: true
				},
				cubeEffect: {
					shadow: false
				},
				navigation: {
					nextEl: $(ele).closest("section").find(".swiper-button-next"),
					prevEl: $(ele).closest("section").find(".swiper-button-prev")
				}
			});
		});
	}

	if ($clients_swiper.length) {
		$clients_swiper.each(function (index, ele) {
			var effect = ($(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect"))) ? $(ele).attr("data-swiper-effect") : "slide";
			new Swiper(`#${$(ele).attr("id")}`, {
				init: true,
				direction: 'horizontal',
				speed: 1000,
				loop: true,
				parallax: true,
				slidesPerView: 4,
				spaceBetween: 30,
				// autoplay: {
				// 	delay: 6000
				// },
				keyboard: {
					enabled: true,
					onlyInViewport: true
				},
				effect: effect,
				fadeEffect: {
					crossFade: true
				},
				cubeEffect: {
					shadow: false
				},
				navigation: {
					nextEl: $(ele).closest("section").find(".swiper-button-next"),
					prevEl: $(ele).closest("section").find(".swiper-button-prev")
				}
			});
		});
	}
};
