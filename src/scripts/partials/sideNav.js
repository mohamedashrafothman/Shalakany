'use strict';

const {capitalize,toLower,isEqual} = require('lodash');
module.exports = (options = {entrance_direction: 'left',exit_direction: 'left',speed: '',animation: 'slide'}) => {
	var side_nav = {
		_animation: {
			speed: toLower(options.speed),
			entrance: `${toLower(options.animation)}In${($('html').attr('dir') === 'ltr') ? capitalize(options.entrance_direction) : capitalize(options.exit_direction)} ${options.speed}`,
			exit: `${toLower(options.animation)}Out${($('html').attr('dir') === 'ltr') ? capitalize(options.exit_direction) : capitalize(options.entrance_direction)} ${options.speed}`,
		},
		_init: function () {
			this._cache_dom();
			this._bind_events();
		},
		_cache_dom: function () {
			this.$body       = $('body');
			this.$menu       = $('.overlay');
			this.$bg_overlay = $('.side-open');
			this.$open_icon  = $('.menu-open');
			this.$close_icon = this.$menu.find('.menu-close');
		},
		_bind_events: function () {
			var _this = this; // refer to side_nav
			this.$body.on('keyup', function (e) {if (isEqual(e.key, 'Escape') && isEqual(e.which, 27)) {_this._close_menu();}});
			this.$open_icon.on('click',  this._open_menu.bind(this));
			this.$close_icon.on('click', this._close_menu.bind(this));
			this.$bg_overlay.on('click', this._close_menu.bind(this));
		},
		_open_menu: function (e) {

			// checking if side nav is closed
			if (!this.$menu.hasClass('open') && !this.$bg_overlay.hasClass('d-block')) {
				// side nav items entrance animation

				// fade in side nav background body overlay
				this.$bg_overlay.addClass('d-block').animateCss(`fadeIn ${this._animation.speed}`);

				// open side nav
				this.$menu.addClass('open').animateCss(this._animation.entrance);
			}
		},
		_close_menu: function (e) {
			var _this = this; // refer to side_nav

			// checking if side nav is open
			if ((this.$menu.hasClass('open') && this.$bg_overlay.hasClass('d-block'))) {

				// fade out side nav background body overlay
				this.$bg_overlay.animateCss(`fadeOut ${this._animation.speed}`, function () {
					_this.$bg_overlay.removeClass('d-block');
				});

				// exit side nav
				this.$menu.animateCss(this._animation.exit, function () {
					_this.$menu.removeClass(`${_this._animation.exit} open`);
				});
			}
		}
	};

	side_nav._init();
};