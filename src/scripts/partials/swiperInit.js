"use strict";

module.exports = function () {
	var $hero_slider = $("#home-banner-slider");
	var $hero_slider_images = $("#home-banner-slider-images");

	var $what_we_do_slider = $('div[id^="home-whatWeDo-slider"]');
	var $timeline_swiper = $('div[id^="timeline-slider"]:not([class*="-prev"]):not([class*="-next"]):not([class*="-pagination"])');
	var $clients_swiper = $("#clients-slider");
	var $gallery_swiper = $("#gallery-slider");
	var $opinions_swiper = $("#opinions-slider");
	var $firms_culture_swiper = $("#firms-culture-slider");
	var effect_array = ["slide", "fade", "cube", "flip", "coverflow"];

	if ($hero_slider.length) {
		var swiper_config = {
			direction: "horizontal",
			speed: 1000,
			autoplay: { delay: 5000, disableOnInteraction: true },
			parallax: true,
			slidesPerView: 1,
			autoHeight: true,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			keyboard: {
				enabled: true,
				onlyInViewport: true,
			},
			navigation: {
				prevEl: `div.swiper-button-prev[for^="${$hero_slider.attr("id")}"]`,
				nextEl: `div.swiper-button-next[for^="${$hero_slider.attr("id")}"]`,
			},
		};

		var swiper_images_config = {
			speed: 1000,
			slidesPerView: 1,
			freeMode: false,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
		};

		const slider = new Swiper(`#${$hero_slider.attr("id")}`, swiper_config);
		const slider_images = new Swiper(`#${$hero_slider_images.attr("id")}`, swiper_images_config);

		slider.on("slideChange", () => {
			slider_images.slideTo(slider.activeIndex);
		});
		slider_images.on("slideChange", () => {
			slider.slideTo(slider_images.activeIndex);
		});
	}
	if ($what_we_do_slider.length) {
		$what_we_do_slider.each(function (index, ele) {
			var effect = $(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect")) ? $(ele).attr("data-swiper-effect") : "slide";
			var swiper_config = {
				direction: "horizontal",
				speed: 1000,
				loop: true,
				parallax: true,
				grabCursor: true,
				effect: effect,
				observer: true,
				observeParents: true,
				keyboard: {
					enabled: true,
					onlyInViewport: true,
				},
				fadeEffect: {
					crossFade: true,
				},
				cubeEffect: {
					shadow: false,
				},
				navigation: {
					prevEl: `div.swiper-button-prev[for^="${$(ele).attr("id")}"]`,
					nextEl: `div.swiper-button-next[for^="${$(ele).attr("id")}"]`,
				},
			};

			new Swiper(`#${$(ele).attr("id")}`, swiper_config);
		});
	}

	if ($timeline_swiper.length) {
		$timeline_swiper.each(function (index, ele) {
			var effect = $(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect")) ? $(ele).attr("data-swiper-effect") : "slide";
			var bullets_array = $(`div.swiper-pagination[for^="${$(ele).attr("id")}"]`)
				.attr("data-pagination-bullets")
				.split(",");
			var swiper_config = {
				direction: "horizontal",
				speed: 1000,
				loop: true,
				parallax: true,
				grabCursor: true,
				effect: effect,
				observer: true,
				observeParents: true,
				keyboard: {
					enabled: true,
					onlyInViewport: true,
				},
				fadeEffect: {
					crossFade: true,
				},
				cubeEffect: {
					shadow: false,
				},
				navigation: {
					prevEl: `div.swiper-button-prev[for^="${$(ele).attr("id")}"]`,
					nextEl: `div.swiper-button-next[for^="${$(ele).attr("id")}"]`,
				},
				pagination: {
					el: `div.swiper-pagination[for^="${$(ele).attr("id")}"] .timeline__pagination-list`,
					clickable: true,
					renderBullet: function (index, className) {
						return `
							<li class="timeline__pagination-list-item ${className}">
								<span class="timeline__pagination-link">${bullets_array[index]}</span>
							</li>
						`;
					},
				},
			};
			new Swiper(`#${$(ele).attr("id")}`, swiper_config);
		});
	}

	if ($clients_swiper.length) {
		$clients_swiper.each(function (index, ele) {
			var effect = $(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect")) ? $(ele).attr("data-swiper-effect") : "slide";
			var swiper_config = {
				direction: "horizontal",
				speed: 1000,
				loop: true,
				// autoplay: {
				// 	delay: 5000,
				// },
				parallax: true,
				slidesPerView: 4,
				effect: effect,
				keyboard: {
					enabled: true,
					onlyInViewport: true,
				},
				fadeEffect: {
					crossFade: true,
				},
				cubeEffect: {
					shadow: false,
				},
				navigation: {
					prevEl: `div.swiper-button-prev[for^="${$(ele).attr("id")}"]`,
					nextEl: `div.swiper-button-next[for^="${$(ele).attr("id")}"]`,
				},
				slidesPerColumn: $(ele).attr("data-swiper-slidesPerColumn") && Boolean($(ele).attr("data-swiper-slidesPerColumn")) ? Number($(ele).attr("data-swiper-slidesPerColumn")) : 1,
				// Responsive breakpoints
				breakpoints: {
					// when window width is >= 0px ------ xs
					0: {
						slidesPerView: 1,
						slidesPerColumn: $(ele).attr("data-swiper-slidesPerColumn") && Boolean($(ele).attr("data-swiper-slidesPerColumn")) ? Number($(ele).attr("data-swiper-slidesPerColumn")) : 1,
					},
					// when window width is >= 576px ------ small
					576: {
						slidesPerView: 2,
						slidesPerColumn: $(ele).attr("data-swiper-slidesPerColumn") && Boolean($(ele).attr("data-swiper-slidesPerColumn")) ? Number($(ele).attr("data-swiper-slidesPerColumn")) : 1,
					},
					// when window width is >= 768px  ------ medium
					768: {
						slidesPerView: 3,
						slidesPerColumn: $(ele).attr("data-swiper-slidesPerColumn") && Boolean($(ele).attr("data-swiper-slidesPerColumn")) ? Number($(ele).attr("data-swiper-slidesPerColumn")) : 1,
					},
					// when window width is >= 992px  ------ large
					992: {
						slidesPerView: 4,
						slidesPerColumn: $(ele).attr("data-swiper-slidesPerColumn") && Boolean($(ele).attr("data-swiper-slidesPerColumn")) ? Number($(ele).attr("data-swiper-slidesPerColumn")) : 1,
					},
					// when window width is >= 1200px  ------ extra large
					1200: {
						slidesPerView: 4,
						slidesPerColumn: $(ele).attr("data-swiper-slidesPerColumn") && Boolean($(ele).attr("data-swiper-slidesPerColumn")) ? Number($(ele).attr("data-swiper-slidesPerColumn")) : 1,
					},
				},
			};

			new Swiper(`#${$(ele).attr("id")}`, swiper_config);
		});
	}

	if ($gallery_swiper.length) {
		$gallery_swiper.each(function (index, ele) {
			var slider_effect = $(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect")) ? $(ele).attr("data-swiper-effect") : "slide";
			var gallery_slider_config = {
				direction: "horizontal",
				speed: 1000,
				loop: true,
				// autoplay: {
				// 	delay: 5000,
				// },
				parallax: true,
				spaceBetween: 10,
				loopedSlides: 4,
				effect: slider_effect,
				keyboard: {
					enabled: true,
					onlyInViewport: true,
				},
				fadeEffect: {
					crossFade: true,
				},
				cubeEffect: {
					shadow: false,
				},
				navigation: {
					prevEl: `div.swiper-button-prev[for^="${$(ele).attr("id")}"]`,
					nextEl: `div.swiper-button-next[for^="${$(ele).attr("id")}"]`,
				},
			};
			var gallery_slider = new Swiper(`#${$(ele).attr("id")}`, gallery_slider_config);

			var $thumb = $(ele).closest("section").find("#gallery-thumbs");
			var gallery_thumbs_config = {
				loop: true,
				spaceBetween: 10,
				centeredSlides: true,
				slidesPerView: "auto",
				// autoplay: {
				// 	delay: 5000,
				// },
				slideToClickedSlide: true,
				loopedSlides: 4,
			};
			var gallery_thumbs = new Swiper(`#${$thumb.attr("id")}`, gallery_thumbs_config);

			gallery_slider.controller.control = gallery_thumbs;
			gallery_thumbs.controller.control = gallery_slider;
		});
	}

	if ($opinions_swiper.length) {
		$opinions_swiper.each(function (index, ele) {
			var effect = $(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect")) ? $(ele).attr("data-swiper-effect") : "slide";
			var swiper_config = {
				direction: "horizontal",
				speed: 1000,
				loop: true,
				// autoplay: {
				// 	delay: 5000,
				// },
				grabCursor: true,
				effect: effect,
				centeredSlides: true,
				keyboard: {
					enabled: true,
					onlyInViewport: true,
				},
				fadeEffect: {
					crossFade: true,
				},
				cubeEffect: {
					shadow: false,
				},
				navigation: {
					prevEl: `div.swiper-button-prev[for^="${$(ele).attr("id")}"]`,
					nextEl: `div.swiper-button-next[for^="${$(ele).attr("id")}"]`,
				},
				spaceBetween: 30,
				slidesPerView: "auto",
				// Responsive breakpoints
				breakpoints: {
					// when window width is >= 0px ------ xs
					0: {
						slidesPerView: 1,
					},
					// when window width is >= 768px  ------ medium
					768: {
						slidesPerView: "auto",
					},
				},
			};

			new Swiper(`#${$(ele).attr("id")}`, swiper_config);
		});
	}

	if ($firms_culture_swiper.length) {
		$firms_culture_swiper.each(function (index, ele) {
			var effect = $(ele).attr("data-swiper-effect") && effect_array.includes($(ele).attr("data-swiper-effect")) ? $(ele).attr("data-swiper-effect") : "slide";
			var swiper_config = {
				direction: "horizontal",
				speed: 1000,
				loop: true,
				grabCursor: true,
				effect: effect,
				keyboard: {
					enabled: true,
					onlyInViewport: true,
				},
				fadeEffect: {
					crossFade: true,
				},
				cubeEffect: {
					shadow: false,
				},
				navigation: {
					prevEl: `div.swiper-button-prev[for^="${$(ele).attr("id")}"]`,
					nextEl: `div.swiper-button-next[for^="${$(ele).attr("id")}"]`,
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
					},
				},
			};

			new Swiper(`#${$(ele).attr("id")}`, swiper_config);
		});
	}
};
