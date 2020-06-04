const mixitup = require('mixitup'); // requiring mixitup from node_modules/
module.exports = () => {
	var duration = 500;
	if ($('#awards-filter').length) {
		var staffMixer = mixitup('#awards-filter', { // container element class
			selectors: {
				target: '.mix-all',
				control: '#awards-tabs .nav-item .nav-link[data-filter]'
			},
			animation: {
				duration: duration
			}
		});
		$('#awards-tabs .nav-item .nav-link[data-filter]').each(function () {
			$(this).on('click', function (e) {
				if (!$(this).hasClass('active')) {
					$(this).addClass('active');
					$(this).parent().siblings().find('.nav-link[data-filter]').removeClass('active');
				}
				staffMixer.filter($(this).data('filter'));
			});
		});
	}
};
