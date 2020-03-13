const saveScoreBtn = document.getElementById("saveScoreBtn");
const mostRecentSCore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const maxHighScores = 5;
console.log(highScores);
finalScore.innerText = mostRecentSCore;


saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value
    };
    highScores.push(score);

    highScores.sort( (a,b) => b.score - a.score);

    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
    
};