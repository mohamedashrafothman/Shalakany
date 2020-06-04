'use strict';
const {capitalize,toLower,isEqual} = require('lodash');

var AppNav = (function() {
	'use strict';
	function AppNav(options = {entrance_direction: 'left', exit_direction: 'left', speed: '', animation: 'slide'}) {
		// enforces new
		if (!(this instanceof AppNav)) {
			return new AppNav(options = {entrance_direction: 'left',exit_direction: 'left',speed: '',animation: 'slide'});
		}
		// constructor body here
		this._animation = {
			speed   : toLower(options.speed),
			entrance: `${toLower(options.animation)}In${($('html').attr('dir') === 'ltr') ? capitalize(options.entrance_direction) : capitalize(options.exit_direction)} ${options.speed}`,
			exit    : `${toLower(options.animation)}Out${($('html').attr('dir') === 'ltr') ? capitalize(options.exit_direction) : capitalize(options.entrance_direction)} ${options.speed}`,
		}
		this._cache_dom();
		this._set_open_state();
		this._bind_events();
	}

	AppNav.prototype._cache_dom = function () {
		this.$body                 = $('body');
		this.$app_navbar           = $(".app-navbar")
		this.$app_navbar_side_menu = this.$app_navbar.find('.app-navbar__side-menu');
		this.$app_navbar_search    = this.$app_navbar.find('.app-navbar__search');
		this.$app_navbar_underlay  = this.$app_navbar.find('.app-navbar__underlay');
		this.$open_menu_button     = this.$app_navbar.find('.app-navbar__open-menu');
		this.$open_search_button = this.$app_navbar.find('.app-navbar__open-search');
		this.$close_menu_button    = this.$app_navbar_side_menu.find('.app-navbar__close-menu');
		this.is_menu_open          = false;
		this.is_search_open        = false;
	},
	AppNav.prototype._set_open_state = function () {
		var _this = this;  // refer to side_nav

		if (_this.$app_navbar_side_menu.hasClass('is_open') && _this.$app_navbar_underlay.hasClass('menu-open')) {
			_this.is_menu_open = true;
		}

		if (_this.$app_navbar_search.hasClass('is_open') && _this.$open_search_button.hasClass('is_open')) {
			_this.is_search_open = true;
		}

		return ;
	},
	AppNav.prototype._bind_events = function () {
		var _this = this;  // refer to side_nav

		_this.$body.on("keyup", function (e) {
			if (isEqual(e.key, "Escape") && isEqual(e.which, 27)) {
				if (_this.is_search_open) _this._close_app_navbar_search(e);
				if (_this.is_menu_open) _this._close_app_navbar_menu(e);
			}
		});
		_this.$open_menu_button.on('click', function(e) {
			// closing search input if opened
			if (_this.is_search_open) {
				_this._close_app_navbar_search(e, _this._open_app_navbar_menu(e));
				// return undefined
				return;
			}
			// open menu
			_this._open_app_navbar_menu(e);
			// return undefined
			return;
		});
		_this.$close_menu_button.on('click', function(e) { _this._close_app_navbar_menu(e); });
		_this.$open_search_button.on('click', function(e) {
			// closing menu if opened
			if (_this.is_menu_open) {
				_this._close_app_navbar_menu(e, _this._toggle_app_navbar_search(e));
				// return undefined
				return;
			}
			// toggle search
			_this._toggle_app_navbar_search(e);
			// return undefined
			return;
		});
		_this.$app_navbar_underlay.on('click', function(e) { _this._close_app_navbar_menu(e); });
	},
	AppNav.prototype._toggle_app_navbar_menu = function(e, cb) {
		var _this = this;  // refer to side_nav

		// checking if side nav is closed
		if (!_this.is_menu_open) {
			_this._open_app_navbar_menu(e, cb);
			// return undefined
			return;
		}
		// checking if side nav is open
		if (_this.is_menu_open) {
			_this._close_app_navbar_menu(e, cb);
			// return undefined
			return;
		}
	},
	AppNav.prototype._open_app_navbar_menu = function (e, cb) {
		var _this = this;  // refer to side_nav

		// check if menu is not opened
		if (!_this.is_menu_open) {
			// fade in side nav background body underlay
			_this.$app_navbar_underlay.addClass('menu-open').animateCss(`fadeIn ${_this._animation.speed}`); // hardcoded fadeIn animation on purpose.
			// open side nav
			_this.$app_navbar_side_menu.addClass('is_open').animateCss(_this._animation.entrance, function() {
				// setting menu open state to true
				_this.is_menu_open = true;
			});
			// fire callback function if passed
			if (cb && typeof cb === 'function') return cb();
		}

		// return undefined
		return;
	},
	AppNav.prototype._close_app_navbar_menu = function (e, cb) {
		var _this = this;  // refer to side_nav

		// check if menu is opened
		if (_this.is_menu_open) {
			// fade out side nav background body underlay
			_this.$app_navbar_underlay.animateCss(`fadeOut ${_this._animation.speed}`, function () {
				_this.$app_navbar_underlay.removeClass(`${_this._animation.exit}  menu-open`);
			});
			// exit side nav
			_this.$app_navbar_side_menu.animateCss(_this._animation.exit, function () {
				_this.$app_navbar_side_menu.removeClass(`${_this._animation.exit} is_open`);
				// set menu open state to false
				_this.is_menu_open = false;
			});
			// fire callback function if passed
			if (cb && typeof cb === 'function') return cb();
		}

		// return undefined
		return;
	},
	AppNav.prototype._toggle_app_navbar_search = function (e, cb) {
		var _this = this;  // refer to side_nav

		if (!_this.is_search_open) {
			_this._open_app_navbar_search(e, cb);
			// return undefined
			return;
		};
		if (_this.is_search_open) {
			_this._close_app_navbar_search(e, cb);
			// return undefined
			return;
		};
	},
	AppNav.prototype._open_app_navbar_search = function(e, cb) {
		var _this = this; // refer to side_nav

		// check if search is not opened
		if (!_this.is_search_open) {
			// change search button icon
			_this.$open_search_button.find(".material-icons").text("close");
			// add class open to the open button
			_this.$open_search_button.addClass('is_open');
			// open navbar search
			_this.$app_navbar_search.addClass('is_open').animateCss(_this._animation.entrance, function() {
				// make search input focus
				_this.$app_navbar_search.find("form input").focus();
				// set search open state to true
				_this.is_search_open = true;
			});
			// fire callback function if passed
			if (cb && typeof cb === 'function') return cb();
		}

		// return undefined
		return;
	},
	AppNav.prototype._close_app_navbar_search = function (e, cb) {
		var _this = this; // refer to side_nav

		// check if search is open
		if (_this.is_search_open) {
			// change search button icon
			_this.$open_search_button.find(".material-icons").text("search");
			// remove open state class from open button
			_this.$open_search_button.removeClass('is_open');
			// exit search input
			_this.$app_navbar_search.animateCss(_this._animation.exit, function () {
				_this.$app_navbar_search.removeClass(`${_this._animation.exit} is_open`);
				// set search open state to false
				_this.is_search_open = false;
			});
			// fire callback function if passed
			if (cb && typeof cb === 'function') return cb();
		}

		// return undefined
		return;
	}

	return AppNav;
}());


module.exports = AppNav;
