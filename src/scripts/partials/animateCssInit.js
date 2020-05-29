'use strict';

module.exports = function () {
	$.fn.extend({
		animateCss: function (animation_name, callback) {
			var animation_end = (function (el) {
				var animations = {
					animation: 'animationend',
					OAnimation: 'oAnimationEnd',
					MozAnimation: 'mozAnimationEnd',
					WebkitAnimation: 'webkitAnimationEnd'
				};
				for (var t in animations) {
					if (el.style[t] !== undefined) {
						return animations[t];
					}
				}
			})(document.createElement('div'));
			this.addClass('animated ' + animation_name).one(animation_end, function () {
				$(this).removeClass('animated ' + animation_name);
				if (typeof callback === 'function') callback();
			})
			return this;
		}
	});
}
