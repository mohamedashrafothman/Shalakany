'use strict';

var videoOverlay = (function () {
	'use strict';

	function videoOverlay() {
		// enforces new
		if (!(this instanceof videoOverlay)) {
			return new videoOverlay();
		}
		this._cachingDom();
	}

	videoOverlay.prototype._cachingDom = function () {
		this.$video_container = $(".inner-article__video");
		this.$video_overlay   = this.$video_container.find(".inner-article__video-overlay");
		this.$video           = this.$video_container.find("video");

		this._bindEvents();
	};
	videoOverlay.prototype._bindEvents = function () {
		// refer to videoOverlay class.
		var _this = this;
		// bind video overlay to click event.
		_this.$video_overlay.on("click", function (e) {
			_this._hideVideoOverlay(e);
		});
	};
	videoOverlay.prototype._hideVideoOverlay = function (e, cb) {
		// refer to videoOverlay class.
		var _this = this;

		if (!_this.$video_overlay.hasClass("d-none")) {
			_this.$video_overlay.animateCss("fadeOut", function () {
				// Hide the video overlay.
				_this.$video_overlay.addClass("d-none");
				// check is video has controller or not
				if (_this.$video_container.hasClass("inner-article__video--no-controls")) {
					// show video controllers.
					_this.$video_container.removeClass("inner-article__video--no-controls");
					// if there is callback, fire it!
					if (cb && typeof cb === "function") return cb();
				}
			});
		}

		// if there is callback, fire it!
		if (cb && typeof cb === 'function') return cb();

		// return undefined.
		return;
	}

	return videoOverlay;
}());

module.exports = videoOverlay;
