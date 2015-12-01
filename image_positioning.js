var IMAGE_MAP = {
	bodyCount: 2,
	1: {
		name: 'Body 1',
		imgSrc: "body_1.png",
		eyeImgSrc: "eye_1.png",
		wingCount: 2,
		markings: [
			'',
			'markings_1_1.png'
		],
		1: {
			name: 'Wing 1_1',
			imgSrc: "wing_1_1.png",
			tailCount: 0
		},
		2 : {
			name: 'Wing 1_2',
			imgSrc: "wing_1_2.png",
			tailCount: 0
		}
	},
	2: {
		name: 'Body 2',
		imgSrc : "body_2.png",
		eyeImgSrc: "eye_2.png",
		wingCount: 2,
		markings: [
			'',
			'markings_2_1.png'
		],
		1 : {
			name: 'Wing 2_1',
			imgSrc: "wing_2_1.png",
			tailCount: 0
		},
		2 : {
			name: 'Wing 2_2',
			imgSrc: "wing_2_2.png",
			tailCount: 0
		}
	}
}

function Positioner() {}

Positioner.prototype.placeImages = function positionFunc(
	bodyType,
	wingType,
	bodyMarking,
	color)
{
	var body = IMAGE_MAP[bodyType];
	var wing = body[wingType];

	var bodyCanvas = $('#body-image canvas');
	var wingCanvas = $('#wing-image canvas');

	Caman('#body-image-canvas', body.imgSrc, function() {
		this.newLayer(function() {
			this.setBlendingMode('multiply');
			this.fillColor(color);
		});
		this.render();
	});

	if (bodyMarking.markingSrc) {
		Caman('#body-marking-canvas', bodyMarking.markingSrc, function() {
			this.newLayer(function() {
				this.setBlendingMode('multiply');
				this.fillColor(color);
			});
			this.brightness(bodyMarking.brightness);
			this.saturation(bodyMarking.saturation);
			this.render();
		});
	}

	Caman('#eye-image-canvas', body.eyeImgSrc, function() {
		this.newLayer(function() {
			this.setBlendingMode('multiply');
			this.fillColor(getRandomizedColor());
		});
		this.render();
	});

	Caman('#wing-image-canvas', wing.imgSrc, function() {
		this.newLayer(function() {
			this.setBlendingMode('multiply');
			this.fillColor(color);
		});
		this.render();
	});

	// TODO: Do wing markings as well
}
