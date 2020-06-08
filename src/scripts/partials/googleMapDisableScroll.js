'use strict';

module.exports = function () {
	var $mapContainer = $('.location__map');
	var $mapIframe = $mapContainer.find('iframe');

	$mapContainer.click(function () {
		$mapIframe.addClass('clicked');
	}).mouseleave(function () {
		$mapIframe.removeClass('clicked');
	});
}
