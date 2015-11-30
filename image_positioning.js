var IMAGE_MAP = {
	bodyCount: 2,
	1: {
		name: 'Body 1',
		imgSrc: "body_1.png",
		wingCount: 2,
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
		wingCount: 2,
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

Positioner.prototype.placeImages = function positionFunc(bodyType, wingType) {
	// TODO: Include tail, use positioning?, use caman.js?
	console.log('placeImages');
	var body = IMAGE_MAP[bodyType];
	var wing = body[wingType];

	var bodyImage = $('#body-image img');
	var wingImage = $('#wing-image img');
	console.log(bodyImage);

	if (!bodyImage || bodyImage.length <= 0) {
		console.log('empty body');
		$('#body-image').empty();
		$('#body-image').html('<img src="" />');
		bodyImage = $('#body-image img');
	}

	if (!wingImage || wingImage.length <= 0) {
		$('#wing-image').empty();
		$('#wing-image').html('<img src="" />');
		wingImage = $('#wing-image img');
	}

	bodyImage.attr('src', body.imgSrc);
	wingImage.attr('src', wing.imgSrc);

	return {
		body: bodyImage,
		wing: wingImage
	};
}
