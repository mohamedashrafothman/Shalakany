'use strict';

var Swiper = require('swiper');
module.exports = function () {
	var $swiper_containers = $('.swiper-container');
	if ($swiper_containers && $swiper_containers.length) {
		var effect_array = ["slide", "fade", "cube", "flip", "coverflow"];
		$swiper_containers.each(function(index, ele){
			var effect = ($(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect"))) ? $(ele).attr("data-swiper-effect") : "slide";
			new Swiper(`#${$(ele).attr("id")}`, {
				init: true,
				direction: 'horizontal',
				speed: 1000,
				loop: true,
				parallax: true,
				grabCursor: true,
				mousewheel: true,
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
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			});
		});
	}
};
