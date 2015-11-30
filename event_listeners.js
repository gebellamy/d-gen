$(document).ready(function() {
	$('#body-selector').change(function bodyChangeFunc() {
		window.generator.updateBody($(this).val());
	});

	$('#wing-selector').change(function wingChangeFunc() {
		window.generator.updateWing($(this).val());
	});

	$('#color-selector').on('blur', function colorChangeFunc() {
		var color = $(this).val();
		if (window.generator.color !== color) {
			window.generator.color = color;
			window.generator.updateColors();
		}
	});
});
