var getRandomizedColor = function randomizeColorFunc() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);

	return '#' + r + g + b;
}
