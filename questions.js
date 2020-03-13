const question = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("option-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("questions.json").then( res => {
    return res.json();
  })
  .then(loadedQuestions => {
      console.log(loadedQuestions);
      questions = loadedQuestions;
      startGame();
  })

  .catch(err => {
      console.error(err);
  });
 

const correctBonus = 10;
const maxQuestions = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
   
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= maxQuestions){
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("/end.html");
    }

    questionCounter++;
    progressText.innerHTML = `Question ${questionCounter}/${maxQuestions}`;

    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question

    options.forEach( option => {
        const number = option.dataset["number"];
        option.innerHTML = currentQuestion["option" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

options.forEach( option => {
    option.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedOption = e.target;
        const selectedAnswer =  selectedOption.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(correctBonus);
        }
        
        selectedOption.parentElement.classList.add(classToApply); 
        setTimeout( () => {
            selectedOption.parentElement.classList.remove(classToApply); 
            getNewQuestion();
        }, 1000);
       
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerHTML = score;
}


