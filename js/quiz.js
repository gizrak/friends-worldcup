var ALL_ROUNDS = 10;

var game = {
    round: 1,
    candidates: [],
    score: 0
};

$(document).ready(function() {
    $('#intro').show();
    $('#game').hide();

    $('#file').change(readFile);
    
    $('#image').click(function() {
        $('#name').text(getName(game.candidates[game.round - 1]));
    });
    $('#correct').click(function() { next(true) });
    $('#incorrect').click(function() { next(false) });
});

readFile = function (event) {
    var files = event.target.files;
    
    $('#intro').hide();
    $('#game').show();

    // aggregate cadidates
    for (var i = 0, file; file = files[i]; i++) {
        game.candidates[i] = file.name;
    }
    game.candidates = shuffle(game.candidates).slice(0, ALL_ROUNDS);
    console.log('candidates:', game.candidates);
    
    // draw game
    draw();
};

shuffle = function (o) { //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

next = function(correct) {
    if (correct === true) {
        game.score++;
    }
    
    console.log(game.round, game.score);
    
    if (game.round >= ALL_ROUNDS) {
        // game over
        var result = [];
        result.push('<div style="background:yellow;color:red;font-size:10em;text-align:center;height:289px">');
        result.push((game.score / ALL_ROUNDS) * 100);
        result.push('</div>');
        $('#frame').html(result.join(''));
    } else {
        // next round
        game.round++;
        draw();
    }
};

draw = function() {
    $('#image').attr('src', 'photos/' + game.candidates[game.round - 1]);
    $('#name').text('');
};

getName = function(filename) {
    return filename.replace(/(모바일|개발지원)-[012345C]-/, '').replace(/.jpg/i, '');
};