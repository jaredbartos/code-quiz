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
var score = 0;
var num = 1;
var feedback = document.createElement("h2");
var finalScoreText = document.createElement("p");


var questions = {
  1: {
    question: "Commonly used data types do NOT include:",
    possibleAnswers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts",
  },
  2: {
    question: "The condition in an if / else statement is enclosed with _________.",
    possibleAnswers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correctAnswer: "parenthesis",
  },
  3: {
    question: "Arrays in JavaScript can be used to store _________.",
    possibleAnswers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correctAnswer: "all of the above",
  },
  4: {
    question: "String values must be enclosed within _________ when being assigned to variables.",
    possibleAnswers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correctAnswer: "quotes",
  },
  5: {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    possibleAnswers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: "console.log",
  },
};

var highScores = {
  names: [],
  scores: [],
};

function displayScore() {
  var nameForm = document.createElement("form");
  var nameLabel = document.createElement("label");
  var nameInput = document.createElement("input");
  var submitBtn = document.createElement("button");
  
  timeLeft = 0;
  questionAsked.removeChild(answerList);
  questionAsked.appendChild(finalScoreText);
  finalScoreText.setAttribute("id", "finalScoreMessage");
  if (score === 25) {
    finalScoreText.textContent = "Congratulations! You have achieved a perfect score of " + score + "!";
  } else if (score >= 0) {
    finalScoreText.textContent = "Your final score is " + score + ".";
  } else {
    score = 0
    finalScoreText.textContent = "Your final score is " + score + ".";
  };
  questionAsked.appendChild(nameForm);
  nameForm.appendChild(nameLabel);
  nameForm.appendChild(nameInput);
  nameForm.appendChild(submitBtn);
  submitBtn.setAttribute("id", "submitBtn");
  submitBtn.setAttribute("type", "button");
  nameLabel.setAttribute("for", "name");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "name");
  nameInput.setAttribute("name", "user_name");
  nameLabel.textContent = "Enter Name: ";
  submitBtn.textContent = "Submit";
}

function finishQuiz() {
  questionText.textContent = "All Done!";
  displayScore();

};

function giveFeedback(event) {
  var selectedAnswer = event.target;
  if (num <= 4) {
    if (selectedAnswer.textContent === questions[num].correctAnswer) {
      feedback.style.borderTop = "2px solid gray";
      feedback.textContent = "Correct!";
      score += 5;
      num++;
      nextQuestion();
    } else if (selectedAnswer.textContent !== questions[num].correctAnswer && selectedAnswer.getAttribute("class") === "answer") {
      feedback.style.borderTop = "2px solid gray";
      feedback.textContent = "Wrong!";
      timeLeft -= 10;
      score -= 2;
      num++;
      nextQuestion();
    }
  } else if (num = 5) {
    if (selectedAnswer.textContent === questions[num].correctAnswer) {
      answerList.style.borderBottom = "2px solid gray";
      feedback.textContent = "Correct!";
      score += 5;
      num++;
      finishQuiz();
    } else if (selectedAnswer.textContent !== questions[num].correctAnswer && selectedAnswer.getAttribute("class") === "answer") {
      answerList.style.borderBottom = "2px solid gray";
      feedback.textContent = "Wrong!";
      score -= 2;
      num++;
      finishQuiz();
    }
  }
};



function countdown() {
  timer.textContent = "Time: " + timeLeft;

  var timeInterval = setInterval(function () {
      if (timeLeft === 0 && num === 6) {
        clearInterval(timeInterval);
        timer.textContent = "Time: " + timeLeft;
      } else if (timeLeft === 0) {
        clearInterval(timeInterval);
        timer.textContent = "Time: " + timeLeft;
        questionText.textContent = "You have run out of time!";
        displayScore();
      } else if (timeLeft > 0) {
        timeLeft--;
        timer.textContent = "Time: " + timeLeft;
      }
}, 1000);
};

function nextQuestion() {
  questionText.textContent = questions[num].question;
  answer1.textContent = questions[num].possibleAnswers[0];
  answer2.textContent = questions[num].possibleAnswers[1];
  answer3.textContent = questions[num].possibleAnswers[2];
  answer4.textContent = questions[num].possibleAnswers[3];
};

function addFirstQuestion() {

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
  questionBox.appendChild(feedback);
  feedback.setAttribute("id", "feedback")
  
  questionText.textContent = questions[1].question;
  questionAsked.style.textAlign = "left";
  
  answer1.textContent = questions[1].possibleAnswers[0];
  answer2.textContent = questions[1].possibleAnswers[1];
  answer3.textContent = questions[1].possibleAnswers[2];
  answer4.textContent = questions[1].possibleAnswers[3];
  countdown();
};

startBtn.addEventListener("click", addFirstQuestion);

answerList.addEventListener("click", giveFeedback);