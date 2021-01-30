const NAME = document.getElementById("username");
const FINALSCORE = document.getElementById("finalscore");
const SAVEBTN = document.querySelector("button[type='submit']");
// gets the current score from localStorage
let currentScore = localStorage.getItem("currentScore");
FINALSCORE.innerText = currentScore;
let arrayofScore;
arrayofScore = localStorage.getItem("scores") === null ? []: JSON.parse(localStorage.getItem("scores"));

NAME.addEventListener("keyup", () => {
	SAVEBTN.disabled = !NAME.value;
})

function saveGame(event) {
	event.preventDefault();
	const SCORE = {
		score: parseInt(currentScore, 10), //converts to int
		name: NAME.value
	}
	arrayofScore.push(SCORE);
	// sort arrayofScore in descending order
	arrayofScore.sort((a,b) => b.score - a.score);
	arrayofScore.splice(5);
	localStorage.setItem("scores", JSON.stringify(arrayofScore));
	window.location.assign("highscore.html");
}

