'use strict';

module.exports = function() {
	$('.inner-article__nav-dropdown').on('change', function (e) {
		$('.inner-article__tabs').find(`#${this.value}`).addClass('show active').siblings().removeClass('show active');
	});
}
