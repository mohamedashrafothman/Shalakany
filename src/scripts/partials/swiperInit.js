'use strict';

module.exports = function () {
	var $single_slide_swiper = $('div[id^="home-banner-slider"], div[id^="home-whatWeDo-slider"], div[id^="timeline-slider"]:not([id*="-prev"]):not([id*="-next"])');
	var $clients_swiper = $("#clients-slider");
	var $gallery_swiper = $("#gallery-slider");
	var $opinions_swiper = $("#opinions-slider");
	var $firms_culture_swiper = $("#firms-culture-slider");
	var effect_array = ["slide", "fade", "cube", "flip", "coverflow"];

	if ($single_slide_swiper.length) {
		$single_slide_swiper.each(function (index, ele) {
			var effect = ($(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect"))) ? $(ele).attr("data-swiper-effect") : "slide";
			var swiper_config = {
				direction: 'horizontal',
				speed: 1000,
				loop: true,
				autoplay: {
					delay: 5000,
				},
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
				direction: 'horizontal',
				speed: 1000,
				loop: true,
				autoplay: {
					delay: 5000,
				},
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

	if ($gallery_swiper.length) {
		$gallery_swiper.each(function (index, ele) {
			var slider_effect = ($(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect"))) ? $(ele).attr("data-swiper-effect") : "slide";
			var gallery_slider_config = {
				direction: 'horizontal',
				speed: 1000,
				loop: true,
				autoplay: {
					delay: 5000,
				},
				parallax: true,
				spaceBetween: 10,
				loopedSlides: 4,
				effect: slider_effect,
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
			};
			var gallery_slider = new Swiper(`#${$(ele).attr("id")}`, gallery_slider_config);


			var $thumb = $(ele).closest('section').find("#gallery-thumbs");
			var gallery_thumbs_config = {
				loop: true,
				spaceBetween: 10,
				centeredSlides: true,
				slidesPerView: 'auto',
				autoplay: {
					delay: 5000,
				},
				slideToClickedSlide: true,
				loopedSlides: 4
			};
			var gallery_thumbs = new Swiper(`#${$thumb.attr("id")}`, gallery_thumbs_config);

			gallery_slider.controller.control = gallery_thumbs;
    		gallery_thumbs.controller.control = gallery_slider;
		});
	}

	if ($opinions_swiper.length) {
		$opinions_swiper.each(function (index, ele) {
			var effect = ($(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect"))) ? $(ele).attr("data-swiper-effect") : "slide";
			var swiper_config = {
				direction: 'horizontal',
				speed: 1000,
				loop: true,
				autoplay: {
					delay: 5000,
				},
				grabCursor: true,
				effect: effect,
				centeredSlides: true,
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
				spaceBetween: 30,
				slidesPerView: 'auto',
				// Responsive breakpoints
				breakpoints: {
					// when window width is >= 0px ------ xs
					0: {
						slidesPerView: 1,
					},
					// when window width is >= 768px  ------ medium
					768: {
						slidesPerView: 'auto',
					}
				}
			};

			new Swiper(`#${$(ele).attr("id")}`, swiper_config);
		});
	}

	if ($firms_culture_swiper.length) {
		$firms_culture_swiper.each(function (index, ele) {
			var effect = ($(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect"))) ? $(ele).attr("data-swiper-effect") : "slide";
			var swiper_config = {
				direction: 'horizontal',
				speed: 1000,
				loop: true,
				grabCursor: true,
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
				spaceBetween: 30,
				slidesPerView: 3,
				// Responsive breakpoints
				breakpoints: {
					// when window width is >= 0px ------ xs
					0: {
						slidesPerView: 1,
					},
					// when window width is >= 768px  ------ medium
					768: {
						slidesPerView: 2,
					},
					// when window width is >= 992px  ------ large
					992: {
						slidesPerView: 3,
					}
				}
			};

			new Swiper(`#${$(ele).attr("id")}`, swiper_config);
		});
	}
};
