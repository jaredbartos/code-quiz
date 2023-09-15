var questionBox = document.querySelector("#questionBox");
var questionAsked = document.querySelector("#question");
var questionText = document.querySelector("#questionText");
var timer = document.querySelector("#timer");
var highScoresLink = document.querySelector("#highScores");
var startBtn = document.querySelector("#start");
var timeLeft = 75
var answerList = document.createElement("ol");
var answer1 = document.createElement("li");
var answer2 = document.createElement("li");
var answer3 = document.createElement("li");
var answer4 = document.createElement("li");
var score;
var correctAnswer = "";

function countdown() {
  timer.textContent = "Time: " + timeLeft;

  var timeInterval = setInterval(function () {
    if (timeLeft === 0) {
      clearInterval(timeInterval);
    } else if (timeLeft > 0) {
      timeLeft--;
      timer.textContent = "Time: " + timeLeft;
    }
}, 1000)
}

function addFirstQuestion(firstQuestion, possibleAnswers, correctAnswer) {
  var firstQuestion = "Commonly used data types Do Not Include:";
  var possibleAnswers = ["strings", "booleans", "alerts", "numbers"];


  startBtn.remove();
  document.querySelector("#intro").remove();
  questionAsked.appendChild(answerList);
  answerList.appendChild(answer1);
  answerList.appendChild(answer2);
  answerList.appendChild(answer3);
  answerList.appendChild(answer4);
  answer1.setAttribute("class", "answer");
  answer2.setAttribute("class", "answer");
  answer3.setAttribute("class", "answer");
  answer4.setAttribute("class", "answer");
  
  questionText.textContent = firstQuestion;
  questionAsked.style.textAlign = "left";
  
  answer1.textContent = possibleAnswers[0];
  answer2.textContent = possibleAnswers[1];
  answer3.textContent = possibleAnswers[2];
  answer4.textContent = possibleAnswers[3];
  countdown();


}

startBtn.addEventListener("click", addFirstQuestion);