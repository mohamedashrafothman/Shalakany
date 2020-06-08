'use strict';

var ClipboardJS = require("clipboard");

module.exports = function () {

	$('.copy-to-clipboard').tooltip({
		trigger: 'click',
		placement: 'top'
	});


	var clipboard = new ClipboardJS(".copy-to-clipboard");
	clipboard.on('success', function (e) {
		setTooltip(e.trigger, 'Copied!');
		hideTooltip(e.trigger);
	});

	clipboard.on('error', function (e) {
		setTooltip(e.trigger, 'Failed!');
		hideTooltip(e.trigger);
	});
}

function setTooltip(btn, message) {
	$(btn).tooltip('hide')
		.attr('data-original-title', message)
		.tooltip('show');
};

function hideTooltip(btn) {
	setTimeout(function () {
		$(btn).tooltip('hide');
	}, 1000);
}
