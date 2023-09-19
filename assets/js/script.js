var questionBox = document.querySelector("#questionBox");
var questionAsked = document.querySelector("#question");
var questionText = document.querySelector("#questionText");
var timer = document.querySelector("#timer");
var highScoresLink = document.querySelector("#highScores");
var startBtn = document.querySelector("#start");
var intro = document.querySelector("#intro");
var highScoresLink = document.querySelector("#highScores");
var timeLeft = 75
var answerList = document.createElement("ol");
var answer1 = document.createElement("li");
var answer2 = document.createElement("li");
var answer3 = document.createElement("li");
var answer4 = document.createElement("li");
var score = 0;
var num = 1;
var feedback = document.createElement("h2");
var finalScore = 0;
var nameInput = document.createElement("input");
var scoreList = document.createElement("ol");
var goBackBtn = document.createElement("button");
goBackBtn.setAttribute("type", "button");
goBackBtn.setAttribute("class", "highScoreBtns");
goBackBtn.textContent = "Go back";
var clearHighScoresBtn = document.createElement("button");
clearHighScoresBtn.setAttribute("type", "button");
clearHighScoresBtn.setAttribute("class", "highScoreBtns");
clearHighScoresBtn.textContent = "Clear high scores";
var stored = localStorage.getItem("scores")
var highScores = JSON.parse(stored);
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
var questionsLength = Object.keys(questions).length;

// Display high score screen
function viewHighScores() {
  // Remove unneeded elements
  intro.remove();
  highScoresLink.remove();
  startBtn.remove();
  timer.remove();
  // Assign and add high scores to list
  questionBox.style.textAlign = "left";
  questionAsked.appendChild(scoreList);
  if (highScores === null) {
    questionText.textContent = "No high scores recorded!";
    scoreList.style.display = "none";
  } else {
    questionText.textContent = "High Scores";
    for (i = 0; i < highScores.length; i++) {
      var li = document.createElement("li");
      scoreList.appendChild(li);
      li.setAttribute("class", "highScore")
      li.textContent = highScores[i].name + " - " + highScores[i].score;
    };
  }
  questionBox.appendChild(goBackBtn);
  questionBox.appendChild(clearHighScoresBtn);
}

// Start question section
function addFirstQuestion() {
  startBtn.remove();
  highScoresLink.remove();
  document.querySelector("#header").style.justifyContent = "right";
  document.querySelector("#intro").remove();

  // Create multiple choice question
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
  
  // Start countdown timer and determine behavior
  var countdown = function() {
    timer.textContent = "Time: " + timeLeft;
    var timeInterval = setInterval(function() {
        if (timeLeft === 0 && num === questionsLength + 1) {
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

  countdown();
};

// Determine how feedback is given
function giveFeedback(event) {
  var selectedAnswer = event.target;
  // Create one second feedback message with .1 second delay after answering
  var goodFeedback = function() {
    var feedbackTimer = 1;
    var feedbackInterval = setInterval(function() {
      if (feedbackTimer > 0) {
        feedback.style.borderTop = "2px solid gray";
        feedback.textContent = "Correct!";
        feedback.style.display = "block";
        feedbackTimer -= 0.1;
      } else {
        clearInterval(feedbackInterval);
        feedback.style.display = "none";
      }
     }, 100);
  }
  var badFeedback = function() {
    var feedbackTimer = 1;
    var feedbackInterval = setInterval(function() {
      if (feedbackTimer > 0) {
        feedback.style.borderTop = "2px solid gray";
        feedback.textContent = "Wrong!";
        feedback.style.display = "block";
        feedbackTimer -= 0.1;
      } else {
        clearInterval(feedbackInterval);
        feedback.style.display = "none";
      }
     }, 100);
  }
  var finishQuiz = function() {
    questionText.textContent = "All Done!";
    displayScore();
  }
  // Response to clicking on choice
  if (num <= questionsLength - 1) {
    if (selectedAnswer.textContent === questions[num].correctAnswer) {
      goodFeedback();
      score += 100/questionsLength;
      num++;
      nextQuestion();
    } else if (selectedAnswer.textContent !== questions[num].correctAnswer && selectedAnswer.getAttribute("class") === "answer") {
      badFeedback();
      timeLeft -= 10;
      num++;
      nextQuestion();
    }
  } else if (num = questionsLength) {
    if (selectedAnswer.textContent === questions[num].correctAnswer) {
      goodFeedback();
      score += 100/questionsLength;
      num++;
      finishQuiz();
    } else if (selectedAnswer.textContent !== questions[num].correctAnswer && selectedAnswer.getAttribute("class") === "answer") {
      badFeedback();
      num++;
      finishQuiz();
    }
  }
};

// Fills question and answer content
function nextQuestion() {
  questionText.textContent = questions[num].question;
  answer1.textContent = questions[num].possibleAnswers[0];
  answer2.textContent = questions[num].possibleAnswers[1];
  answer3.textContent = questions[num].possibleAnswers[2];
  answer4.textContent = questions[num].possibleAnswers[3];
};

// Behavior of score screen after answering all questions
function displayScore() {
  var nameForm = document.createElement("form");
  var nameLabel = document.createElement("label");
  var finalScoreText = document.createElement("p");
  var submitBtn = document.createElement("button");
  timeLeft = 0;
  questionAsked.removeChild(answerList);
  questionAsked.appendChild(finalScoreText);
  finalScoreText.setAttribute("id", "finalScoreMessage");
  if (score === 100) {
    finalScoreText.textContent = "Congratulations! You have achieved a perfect score of " + score + "%!";
  } else if (score >= 0) {
    finalScoreText.textContent = "Your final score is " + score + "%.";
  } else {
    score = 0
    finalScoreText.textContent = "Your final score is " + score + "%.";
  };
  // Create form for name input for saving score
  questionAsked.appendChild(nameForm);
  nameForm.appendChild(nameLabel);
  nameForm.setAttribute("onsubmit", "return false");
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
  finalScore = score;

  submitBtn.addEventListener("click", submitScore);
}

// After submitting name and score
function submitScore() {
  timer.remove();
  questionAsked.textContent = "High scores";
  // Populate high score list from local storage and sort by score, if necessary
  if (highScores === null) {
    highScores = [
      {
        name: nameInput.value,
        score: finalScore,
      }
    ]
    } else {
      highScores.push({name: nameInput.value, score: finalScore});
      highScores = highScores.sort(function(a, b) {return b.score - a.score});
    }
  localStorage.setItem("scores", JSON.stringify(highScores));
  questionAsked.appendChild(scoreList);
  for (i = 0; i < highScores.length; i++) {
    var li = document.createElement("li");
    scoreList.appendChild(li);
    li.setAttribute("class", "highScore")
    li.textContent = highScores[i].name + " - " + highScores[i].score + "%";
  }
  questionBox.appendChild(goBackBtn)
  questionBox.appendChild(clearHighScoresBtn);
  questionBox.style.textAlign = "left";
}

// Set event listeners
startBtn.addEventListener("click", addFirstQuestion);
answerList.addEventListener("click", giveFeedback);
highScoresLink.addEventListener("click", viewHighScores);
clearHighScoresBtn.addEventListener("click", function() {
  localStorage.clear();
  questionAsked.textContent = "No high scores recorded!";
  scoreList.style.display = "none";
});
goBackBtn.addEventListener("click", function() {
  location.reload()
});