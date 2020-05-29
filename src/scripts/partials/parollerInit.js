module.exports = () => {
	$("[data-paroller-factor]").each(function (index, item) {
		$(item).paroller({ transition: 'transition 0.05s ease' });
	});
}
