const QUESTION  = document.getElementById("question");
const CHOICES = Array.from(document.getElementsByClassName("choice-text"));
const progressBar = document.getElementById("progress-full-bar");
const progressText = document.getElementById("progresstext");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let questions = [
	{
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

scoreText.innerText = score;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
}

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
		// store the score in localStorage
		localStorage.setItem("currentScore", score);
		// go to end page
		return location.assign("end.html");
	}
	questionCounter++;
	// update prograssBar
	progressBar.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;
	progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
	const questionIndex = Math.floor(Math.random()*availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	QUESTION.innerText = currentQuestion.question;
	
	CHOICES.forEach(element => {
		var number = element.dataset["number"];
		element.innerText = currentQuestion["choice"+number];
	})
	availableQuestions.splice(questionIndex, 1);
	acceptingAnswers = true;
}

CHOICES.forEach(choice => {
	choice.addEventListener("click", function () {
		if (!acceptingAnswers) {
			// prevents the user from clicking more than one choice
			return;
		}
		
		acceptingAnswers = false
		var classToApply = this.dataset["number"] == currentQuestion.answer? "correct": "incorrect";
		if (classToApply == "correct") {
			incrementScore(CORRECT_BONUS);
			
		}
		choice.parentElement.classList.add(classToApply);
		setTimeout(()=> {
			choice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000);
	})
});

incrementScore = (num) => {
	score += num;
	scoreText.innerText = score;
}

startGame();