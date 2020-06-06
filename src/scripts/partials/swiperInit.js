'use strict';

var Swiper = require('swiper');
module.exports = function () {
	var $single_slide_swiper = $('div[id^="home-banner-slider"], div[id^="home-whatWeDo-slider"], div[id^="timeline-slider"]:not([id*="-prev"]):not([id*="-next"])');
	var $clients_swiper = $("#clients-slider");
	var effect_array = ["slide", "fade", "cube", "flip", "coverflow"];

	// FIXME: fix multiple slider in the same page with bootstrap tabs issue.

	if ($single_slide_swiper.length) {
		$single_slide_swiper.each(function (index, ele) {
			var effect = ($(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect"))) ? $(ele).attr("data-swiper-effect") : "slide";
			var swiper_config = {
				init: true,
				direction: 'horizontal',
				speed: 1000,
				loop: true,
				parallax: true,
				grabCursor: true,
				effect: effect,
				keyboard: { enabled: true, onlyInViewport: true },
				fadeEffect: { crossFade: true },
				cubeEffect: { shadow: false },
				navigation: {
					prevEl: `div.swiper-button-prev[for^="${$(ele).attr('id')}"]`,
					nextEl: `div.swiper-button-next[for^="${$(ele).attr('id')}"]`
				}
			};

			new Swiper(`#${$(ele).attr("id")}`, swiper_config);
		});
	}

	if ($clients_swiper.length) {
		$clients_swiper.each(function (index, ele) {
			var effect = ($(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect"))) ? $(ele).attr("data-swiper-effect") : "slide";
			var swiper_config = {
				init: true,
				direction: 'horizontal',
				speed: 1000,
				loop: true,
				parallax: true,
				slidesPerView: 4,
				slidesPerColumn: ($(ele).attr("data-swiper-slidesPerColumn") && Boolean($(ele).attr("data-swiper-slidesPerColumn"))) ? Number($(ele).attr("data-swiper-slidesPerColumn"))  : 1,
				effect: effect,
				keyboard: { enabled: true, onlyInViewport: true },
				fadeEffect: { crossFade: true },
				cubeEffect: { shadow: false },
				navigation: {
					prevEl: `div.swiper-button-prev[for^="${$(ele).attr('id')}"]`,
					nextEl: `div.swiper-button-next[for^="${$(ele).attr('id')}"]`
				}
			};

			new Swiper(`#${$(ele).attr("id")}`, swiper_config);
		});
	}
};
