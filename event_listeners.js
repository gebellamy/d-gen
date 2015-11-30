$(document).ready(function() {
	$('#body-selector').change(function bodyChangeFunc() {
		window.generator.updateBody($(this).val());
	});

	$('#wing-selector').change(function wingChangeFunc() {
		window.generator.updateWing($(this).val());
	});

	$('#color-selector').on('input', function colorChangeFunc() {
		window.generator.color = ($(this).val());
		window.generator.updateColors();
	});
});
