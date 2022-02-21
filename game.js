let color = ['red', 'blue', 'green', 'yellow'];
let sequence = [];
let userClicked = [];
let currentLevel = 0;
let result = '';

$('#level-title').click(function () {
    if (currentLevel === 0) {
        nextSequence();
    }
});

$(".btn").click(function () {
    if (currentLevel > 0) {
        userClicked.push(this.id);
        resultCheck(userClicked.length - 1);
        if (result = 'correct') {
            playSound(this.id);
            animatePressed(this.id);
        }
    }
});

function nextSequence() {
    userClicked = [];
    currentLevel++;
    $('#level-title').text('Level ' + currentLevel);
    let chosenColor = color[Math.floor(Math.random() * 4)]
    $('#' + chosenColor).fadeOut(650).fadeIn(650);
    playSound(chosenColor);
    sequence.push(chosenColor);
}

function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePressed(keyed) {
    $("." + keyed).addClass('pressed');
    setTimeout(function () {
        $("." + keyed).removeClass('pressed');
    }, 90);
}

function resultCheck(n) {
    if (sequence[n] === userClicked[n]) {
        if (userClicked.length === sequence.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
        playSound('wrong');
    }
}

function gameOver() {
    $('#level-title').html('<p>Game Over!</p>');
    currentLevel = 0;
    sequence = [];
    userClicked = [];
    result = '';
    setTimeout(function () {
        $('#level-title').html('<p>Tap here to try again</p>')
    }, 3000);
    setTimeout(function () {
        $('#level-title').fadeOut(500).fadeIn(500)
    }, 2500);
}