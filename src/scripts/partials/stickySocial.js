module.exports = function () {
	// Sticky Shares
	var $shares = $('.inner-article__social'),
		$sharesHeight = $shares.height(),
		$sharesTop,
		$sharesCon = $shares.parent(),
		$sharesConTop,
		$sharesConLeft,
		$sharesConHeight,
		$sharesConBottom,
		$offsetTop = 0;

	function setStickyPos() {
		if ($shares.length > 0) {
			$sharesTop = $shares.offset().top
			$sharesConTop = $sharesCon.offset().top;
			$sharesConLeft = $sharesCon.offset().left;
			$sharesConHeight = $sharesCon.height();
			$sharesConBottom = $sharesConHeight + $sharesConTop;
		}
	}

	function stickyShares(wScroll) {
		if ($shares.length > 0) {
			if ($sharesConBottom - $sharesHeight - $offsetTop < wScroll) {
				$shares.css({ position: 'absolute', top: $sharesConHeight - $sharesHeight });
			} else if ($sharesTop < wScroll + $offsetTop) {
				$shares.css({ position: 'fixed', top: $offsetTop });
			} else {
				$shares.css({ position: 'absolute', top: 0 });
			}
		}
	}

	$(window).on('scroll', function () { stickyShares($(this).scrollTop()); });

	$(window).resize(function () {
		setStickyPos();
		stickyShares($(this).scrollTop());
	});

	setStickyPos();
}
