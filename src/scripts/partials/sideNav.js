'use strict';

const {capitalize,toLower,isEqual} = require('lodash');
module.exports = (options = {entrance_direction: 'left',exit_direction: 'left',speed: '',animation: 'slide'}) => {
	var side_nav = {
		_animation: {
			speed   : toLower(options.speed),
			entrance: `${toLower(options.animation)}In${($('html').attr('dir') === 'ltr') ? capitalize(options.entrance_direction) : capitalize(options.exit_direction)} ${options.speed}`,
			exit    : `${toLower(options.animation)}Out${($('html').attr('dir') === 'ltr') ? capitalize(options.exit_direction) : capitalize(options.entrance_direction)} ${options.speed}`,
		},
		_init: function () {
			this._cache_dom();
			this._bind_events();
		},
		_cache_dom: function () {
			this.$body            = $('body');
			this.$navbar          = $('.navbar__side-menu');
			this.$navbar_underlay = $('.navbar__underlay');
			this.$open_icon       = $('.navbar__open-button');
			this.$close_icon      = this.$navbar.find('.navbar__close-button');
		},
		_bind_events: function () {
			var _this = this;  // refer to side_nav
			this.$body.on('keyup', function (e) {if (isEqual(e.key, 'Escape') && isEqual(e.which, 27)) {_this._close_navbar();}});
			this.$open_icon.on('click',  this._open_navbar.bind(this));
			this.$close_icon.on('click', this._close_navbar.bind(this));
			this.$navbar_underlay.on('click', this._close_navbar.bind(this));
		},
		_open_navbar: function (e) {

			// checking if side nav is closed
			if (!this.$navbar.hasClass('is_open') && !this.$navbar_underlay.hasClass('d-block')) {

				// fade in side nav background body underlay
				this.$navbar_underlay.addClass('d-block').animateCss(`fadeIn ${this._animation.speed}`);

				// open side nav
				this.$navbar.addClass('is_open').animateCss(this._animation.entrance);
			}
		},
		_close_navbar: function (e) {
			var _this = this;  // refer to side_nav

			// checking if side nav is open
			if ((this.$navbar.hasClass('is_open') && this.$navbar_underlay.hasClass('d-block'))) {

				// fade out side nav background body underlay
				this.$navbar_underlay.animateCss(`fadeOut ${this._animation.speed}`, function () {
					_this.$navbar_underlay.removeClass('d-block');
				});

				// exit side nav
				this.$navbar.animateCss(this._animation.exit, function () {
					_this.$navbar.removeClass(`${_this._animation.exit} is_open`);
				});
			}
		}
	};

	side_nav._init();
};
