'use strict';

var videoOverlay = (function () {
	'use strict';

	function videoOverlay() {
		// enforces new
		if (!(this instanceof videoOverlay)) {
			return new videoOverlay();
		}
		this._cachingDom();
		this._bindEvents();
	}

	videoOverlay.prototype._cachingDom = function () {
		this.$video_container = $(".inner-article__video, .board-member__video");
		this.$video_overlay   = this.$video_container.find("div[class*='video-overlay']");
		this.$iframe          = this.$video_container.find("iframe");
	};
	videoOverlay.prototype._bindEvents = function () {
		// refer to videoOverlay class.
		var _this = this;
		// bind video overlay to click event.
		_this.$video_overlay.each(function (index, ele) {
			$(ele).on("click", function (e) {
				_this._hideVideoOverlay(e);
			});
		})
	};
	videoOverlay.prototype._hideVideoOverlay = function (e, cb) {
		e.stopPropagation();
		// refer to videoOverlay class.
		var _this = this;

		if (!$(e.target).hasClass("d-none")) {
			$(e.target).closest("div[class*='video-overlay']").animateCss("fadeOut", function () {
				// Hide the video overlay.
				$(e.target).closest("div[class*='video-overlay']").addClass("d-none");
				// check is video has controller or not
				if ($(e.target).closest("div[class*='video-overlay']").parent().hasClass("no-controls")) {
					// show video controllers.
					$(e.target).closest("div[class*='video-overlay']").parent().removeClass("no-controls");
					// play video after remove overlay.
					// FIXME: play video after clicking on overlay button.
					// _this.$iframe.find("video").get(0).play();
					// if there is callback, fire it!
					if (cb && typeof cb === "function") return cb();
				}
			});
		}

		// if there is callback, fire it!
		if (cb && typeof cb === 'function') return cb();
	}

	return videoOverlay;
}());

module.exports = videoOverlay;
