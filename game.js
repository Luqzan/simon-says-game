var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").on("click", function () {
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function () {
	if (level === 0) {
		nextSequence();
	}
});

function nextSequence() {
	level++;
	userClickedPattern = [];
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#level-title").text("Level " + level);

	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);

	playSound(randomChosenColour);
}

function playSound(name) {
	var audio = new Audio("./sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		console.log("Correct!");
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(nextSequence, 1000);
		}
	} else {
		console.log("Wrong!");
		playSound("wrong");
		$("h1").text("Game Over, Press Any Key to Restart");
		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

		startOver();
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
}
