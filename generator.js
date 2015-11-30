function Generator() {
	// TODO: Randomize all
	this.bodyType = 1;
	this.wingType = 1;
	this.color = '#499df5';

	this.positioner = new Positioner();
}

Generator.prototype.render = function renderFunc() {
	// TODO: Create canvas element and place images on canvas?
	// Investigate: use caman.js for colorification?
	this.images = this.positioner.placeImages(this.bodyType, this.wingType);
	this.setColors();
	this.updateSelects();
}

Generator.prototype.setColors = function setColorsFunc() {
	var color = this.color;
	$('#color-selector').val(color);

	Caman('#body-image img', function() {
		this.newLayer(function() {
			this.setBlendingMode('multiply');
			this.fillColor(color);
		});

		this.render();
	});

	Caman('#wing-image img', function() {
		this.newLayer(function() {
			this.setBlendingMode('multiply');
			this.fillColor(color);
		});

		this.render();
	});
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
		this.render();
	}
}

$(document).ready(function() {
	window.generator = new Generator();
	window.generator.render();
});
