const HIGHSCORELIST = document.getElementById("highscoreslist");
const HIGHSCORES = JSON.parse(localStorage.getItem("scores"));

console.log(HIGHSCORES);

// another way to display the high score
// HIGHSCORES.forEach((element) => {
	// let itemElement = `
		// <li>${element.score} ${element.name}</li>
	// `
	// HIGHSCORELIST.insertAdjacentHTML("beforeend", itemElement);
// })

HIGHSCORELIST.innerHTML = HIGHSCORES.map(element => {
	return `<li class="highscore">${element.score} - ${element.name}</li>
	`
}).join("");