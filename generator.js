function Generator() {
	this.randomize();

	$('#color-selector').val(this.color);
	this.positioner = new Positioner();
}

Generator.prototype.randomize = function randomizeFunc() {
	this.randomizeBodyType();
	this.randomizeWingType();
	this.randomizeColor();
}

Generator.prototype.randomizeBodyType = function randomzeBodyFunc() {
	this.bodyType = Math.floor(Math.random() * (IMAGE_MAP.bodyCount)) + 1;
}

Generator.prototype.randomizeWingType = function randomizeWingFunc() {
	var count = IMAGE_MAP[this.bodyType].wingCount;
	this.wingType = Math.floor(Math.random() * count) + 1;
}

Generator.prototype.randomizeColor = function randomizeColorFunc() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);

	this.color = '#' + r + g + b;
}

Generator.prototype.render = function renderFunc() {
	this.positioner.placeImages(this.bodyType, this.wingType, this.color);
	this.updateSelects();
}

Generator.prototype.updateColors = function updateColorsFunc() {
	var color = this.color;

	Caman('#body-image canvas', function() {
		this.revert();
		this.newLayer(function() {
			this.setBlendingMode('multiply');
			this.fillColor(color);
		});

		this.render();
	});

	Caman('#wing-image canvas', function() {
		this.revert();
		this.newLayer(function() {
			this.setBlendingMode('multiply');
			this.fillColor(color);
		});

		this.render();
	});
}

Generator.prototype.updateSelects = function updateSelectsFunc() {
	// Update body
	var select = document.getElementById('body-selector');
	select.innerHTML = '';
	for (var i = 1; i <= IMAGE_MAP.bodyCount; i ++) {
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = IMAGE_MAP[i].name;
		if (i == this.bodyType) {
			opt.setAttribute('selected', 'selected');
		}
		select.appendChild(opt);
	}

	// Update wing
	select = document.getElementById('wing-selector');
	select.innerHTML = '';
	for (var i = 1; i <= IMAGE_MAP[this.bodyType].wingCount; i ++) {
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = IMAGE_MAP[this.bodyType][i].name;
		if (i == this.wingType) {
			opt.setAttribute('selected', 'selected');
		}
		select.appendChild(opt);
	}

	// TODO: Update tail
}

Generator.prototype.updateBody = function updateBodyFunc(bodyType) {
	// Only re-render on an actual change
	if (bodyType !== this.bodyType) {
		this.bodyType = bodyType;
		// Wing type needs to be reset to default when the body is changed
		this.wingType = 1;
		this.render();
	}
}

Generator.prototype.updateWing = function updateWingFunc(wingType) {
	// Only re-render on an actual change
	if (wingType !== this.wingType) {
		this.wingType = wingType;
		this.renderWing();
	}
}

$(document).ready(function() {
	window.generator = new Generator();
	window.generator.render();
});
