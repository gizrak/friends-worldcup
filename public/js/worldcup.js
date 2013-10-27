var ALL_ROUNDS = 16;

var game = {
	type : ALL_ROUNDS,
	round : 1,
	candidates : [],
	winners : []
};

$(document).ready(function() {
	$('#intro').show();
	$('#game').hide();
	$('#winner').hide();

	$('#file').change(readFile);

	$('#left_image').click(function() {
		win(2);
	});
	$('#right_image').click(function() {
		win(1);
	});

	$('#newgame').click(function() {
		window.location.reload();
	});
});

readFile = function(event) {
	var files = event.target.files;

	if (files.length < 2) {
		alert('최소 2명 이상을 선택해 주세요.');
		return;
	} else if (files.length < 4) {
		ALL_ROUNDS = 2;
		game.type = 2; 
	} else if (files.length < 8) {
		ALL_ROUNDS = 4;
		game.type = 4; 
	} else if (files.length < 16) {
		ALL_ROUNDS = 8;
		game.type = 8; 
	} else {
		ALL_ROUNDS = 16;
		game.type = 16;
	}

	$('#intro').hide();
	$('#game').show();
	$('#winner').hide();

	for ( var i = 0, u; file = files[i]; i++) {
		game.candidates[i] = file;
	}
	game.candidates = shuffle(game.candidates).slice(0, ALL_ROUNDS);

	draw();
};

shuffle = function(o) { // v1.0
	for ( var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
		;
	return o;
};

win = function(seed) {
	var winner = game.candidates[(2 * game.round) - seed];

	switch (game.type) {
	case 16:
	case 8:
	case 4:
		game.winners.push(winner);
		console.log(game.type + '강', game.round + '라운드:', game.winners);
		if (game.round === (game.type / 2)) {
			game.type = (game.type / 2);
			game.round = 1;
			game.candidates = game.winners;
			game.winners = [];
		} else {
			game.round++;
		}
		draw();
		break;

	case 2:
		console.log('결승: ', winner);
		var reader = new FileReader();
		reader.onload = function(e) {
			$('#winner_image').removeAttr("src").attr('src', e.target.result);
			$('#winner_name').text(getName(winner.name).substring(0, 10));
		};
		reader.readAsDataURL(winner);

		$('#intro').hide();
		$('#game').hide();
		$('#winner').show();
		break;

	default:
		console.error('Do not reach here!');
	}
};

draw = function() {
	switch (game.type) {
	case 16:
	case 8:
	case 4:
		$('#round_title').text(game.type + '강, ' + game.round + '라운드');
		break;

	case 2:
		$('#round_title').text('결승');
		break;

	default:
		console.error('Do not reach here!');
	}

	var seed1 = game.candidates[(2 * game.round) - 2];
	var seed2 = game.candidates[(2 * game.round) - 1];

	var reader1 = new FileReader();
	reader1.onload = function(e) {
		$('#left_image').removeAttr("src").attr('src', e.target.result);
		$('#left_name').text(seed1.name.substring(0, 10));
	};
	reader1.onerror = function(e) {
		alert(e.target.error.code);
	};
	reader1.readAsDataURL(seed1);

	var reader2 = new FileReader();
	reader2.onload = function(e) {
		$('#right_image').removeAttr("src").attr('src', e.target.result);
		$('#right_name').text(seed2.name.substring(0, 10));
	};
	reader2.onerror = function(e) {
		alert(e.target.error.code);
	};
	reader2.readAsDataURL(seed2);
};

getName = function(filename) {
	return filename.replace(/.jpg/i, '');
};
