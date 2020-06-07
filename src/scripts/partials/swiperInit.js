'use strict';

module.exports = function () {
	var $single_slide_swiper = $('div[id^="home-banner-slider"], div[id^="home-whatWeDo-slider"], div[id^="timeline-slider"]:not([id*="-prev"]):not([id*="-next"])');
	var $clients_swiper = $("#clients-slider");
	var effect_array = ["slide", "fade", "cube", "flip", "coverflow"];

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
				observer: true,
				observeParents: true,
				keyboard: {
					enabled: true,
					onlyInViewport: true
				},
				fadeEffect: {
					crossFade: true
				},
				cubeEffect: {
					shadow: false
				},
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
				effect: effect,
				keyboard: {
					enabled: true,
					onlyInViewport: true
				},
				fadeEffect: {
					crossFade: true
				},
				cubeEffect: {
					shadow: false
				},
				navigation: {
					prevEl: `div.swiper-button-prev[for^="${$(ele).attr('id')}"]`,
					nextEl: `div.swiper-button-next[for^="${$(ele).attr('id')}"]`
				},
				slidesPerColumn: ($(ele).attr("data-swiper-slidesPerColumn") && Boolean($(ele).attr("data-swiper-slidesPerColumn"))) ? Number($(ele).attr("data-swiper-slidesPerColumn")) : 1,
				// Responsive breakpoints
				breakpoints: {
					// when window width is >= 0px ------ xs
					0: {
						slidesPerView: 1,
						slidesPerColumn: ($(ele).attr("data-swiper-slidesPerColumn") && Boolean($(ele).attr("data-swiper-slidesPerColumn"))) ? Number($(ele).attr("data-swiper-slidesPerColumn")) : 1,
					},
					// when window width is >= 576px ------ small
					576: {
						slidesPerView: 2,
						slidesPerColumn: ($(ele).attr("data-swiper-slidesPerColumn") && Boolean($(ele).attr("data-swiper-slidesPerColumn"))) ? Number($(ele).attr("data-swiper-slidesPerColumn")) : 1,
					},
					// when window width is >= 768px  ------ medium
					768: {
						slidesPerView: 3,
						slidesPerColumn: ($(ele).attr("data-swiper-slidesPerColumn") && Boolean($(ele).attr("data-swiper-slidesPerColumn"))) ? Number($(ele).attr("data-swiper-slidesPerColumn")) : 1,
					},
					// when window width is >= 992px  ------ large
					992: {
						slidesPerView: 4,
						slidesPerColumn: ($(ele).attr("data-swiper-slidesPerColumn") && Boolean($(ele).attr("data-swiper-slidesPerColumn"))) ? Number($(ele).attr("data-swiper-slidesPerColumn")) : 1,
					},
					// when window width is >= 1200px  ------ extra large
					1200: {
						slidesPerView: 4,
						slidesPerColumn: ($(ele).attr("data-swiper-slidesPerColumn") && Boolean($(ele).attr("data-swiper-slidesPerColumn"))) ? Number($(ele).attr("data-swiper-slidesPerColumn")) : 1,
					}
				}
			};

			new Swiper(`#${$(ele).attr("id")}`, swiper_config);
		});
	}
};
