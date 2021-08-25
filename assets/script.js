const mainEl = document.querySelector("main");
const timeEl = document.querySelector(".count-down");
let headerEl = document.createElement("h1");
headerEl.setAttribute("class", "header");
let startBtn = document.createElement("button");
let welcomeDiv = document.createElement("div");
welcomeDiv.setAttribute("class", "welcome");
startBtn.setAttribute("class", "start-button");
let scoresContainer = document.createElement("div");
scoresContainer.setAttribute("class", "scores-container");
let playAgainBtn = document.createElement("button");
playAgainBtn.setAttribute("class", "play-again-button");

let currentQuestion = -1;
let currentChoice = -1;

let score = 0;
let correctAnswer = 0;

let timeLeft = 60;
let time;

const questions = [
  {
    question: "What does HTML stand for?",
    choices: [
      "Hyper Text Markup Language",
      "Home Tool Makeup Language",
      "Hyperlinks and Text Markup Language",
      "Home Tacos Mayo Lasagna",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which is the correct HTML tag for the largest heading?",
    choices: ["Head", "h1", "h6", "Pants"],
    answer: "h1",
  },
  {
    question: "Which HTML tag allows you to make a bulleted list?",
    choices: ["ol", "d1", "ul", "bulleted list"],
    answer: "ul",
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Crayon Simple sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question:
      "Where in an HTML document is the correct place to refer to an external style sheet?",
    choices: [
      "At the top of the bowl",
      "In the head",
      "In the body",
      "At the bottom of the document",
    ],
    answer: "In the head",
  },
  {
    question: "What does the triple equals ( === ) in JavaScript prevent?",
    choices: [
      "the reassignment of variables",
      "type coercion",
      "a value of null",
      "none of the above",
    ],
    answer: "type coercion",
  },
  {
    question: "Arrays in JavaScript can be used to store __________.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
];

function homePage() {
  mainEl.appendChild(headerEl);
  headerEl.textContent = "Coding Quiz Challenge";

  mainEl.appendChild(welcomeDiv);
  welcomeDiv.textContent =
    "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will subtract 5 second from the clock.";

  mainEl.appendChild(startBtn);
  startBtn.textContent = "Start";
}

function startQuiz() {
  timer();
  renderQuiz();
  nextQuestion();
}

function timer() {
  time = setInterval(function () {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft < 0) {
      timeEl.textContent = 0;
      endQuiz();
    } else if (timeLeft === 0) {
      endQuiz();
    }
  }, 1000);
}

function renderQuiz() {
  mainEl.textContent = "";

  if (questions.length > 6 || timer > 0) {
    console.log(questions.length);
  }
}

function nextQuestion() {
  currentQuestion++;

  if (!questions[currentQuestion]) {
    return endQuiz();
  }

  let questionEl = document.createElement("div");
  questionEl.setAttribute("class", "question");
  questionEl.textContent = questions[currentQuestion].question;
  mainEl.appendChild(questionEl);

  let quizChoices = questions[currentQuestion].choices;
  let choiceEl = document.createElement("div");
  choiceEl.setAttribute("class", "choices-container");
  mainEl.appendChild(choiceEl);

  quizChoices.forEach((choice) => {
    let choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice-btn");
    choiceBtn.setAttribute("data", choice);
    choiceBtn.textContent = choice;

    currentChoice++;
    choiceEl.appendChild(choiceBtn);

    choiceBtn.addEventListener("click", checkAnswer);
  });
}

function checkAnswer() {
  if (this.getAttribute("data") === questions[currentQuestion].answer) {
    correctAnswer++;
    score += 5;
  } else {
    timeLeft -= 5;
  }

  document.querySelector(".main-content").textContent = "";
  nextQuestion();
}

function endQuiz() {
  clearInterval(time);
  statsPage();
}

function statsPage() {
  mainEl.textContent = "";

  let statsEl = document.createElement("div");
  statsEl.setAttribute("class", "stats");
  mainEl.appendChild(statsEl);

  let finalMessageEl = document.createElement("h1");
  finalMessageEl.setAttribute("class", "final-message");
  finalMessageEl.textContent = "< QUIZ COMPLETE >";
  statsEl.appendChild(finalMessageEl);

  let correctAnswerEl = document.createElement("p");
  correctAnswerEl.setAttribute("class", "num-correct");
  correctAnswerEl.textContent =
    "You got " + correctAnswer + " question(s) out of 7 correct!";
  statsEl.appendChild(correctAnswerEl);

  let scoreEl = document.createElement("p");
  scoreEl.setAttribute("class", "score");
  scoreEl.textContent = "Final score: " + score + " out of 35 points";
  statsEl.appendChild(scoreEl);

  let initialsContainerEl = document.createElement("div");
  initialsContainerEl.textContent = "Enter your initials to save your score: ";
  statsEl.appendChild(initialsContainerEl);

  let inputInitialsEl = document.createElement("input");
  inputInitialsEl.setAttribute("class", "initials");
  inputInitialsEl.setAttribute("type", "text");
  inputInitialsEl.setAttribute("name", "initials-text");
  initialsContainerEl.appendChild(inputInitialsEl);

  let submitBtn = document.createElement("button");
  submitBtn.setAttribute("class", "submit-button");
  submitBtn.textContent = "Submit";
  initialsContainerEl.appendChild(submitBtn);

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    let initials = inputInitialsEl.value.trim();

    let userScoreInfo = {
      initials: initials,
      score: score,
    };

    if (localStorage.getItem("scores") === null) {
      localStorage.setItem("scores", "[]");
    }

    let highscoreList = JSON.parse(localStorage.getItem("scores"));
    highscoreList.push(userScoreInfo);

    localStorage.setItem("scores", JSON.stringify(highscoreList));

    viewHighscores();
  });
}

function viewHighscores() {
  mainEl.textContent = "";
  scoresContainer.textContent = "";

  let highscoresHeaderEl = document.createElement("h1");
  highscoresHeaderEl.setAttribute("class", "highscores-header");
  highscoresHeaderEl.textContent = "Highscores";
  mainEl.appendChild(highscoresHeaderEl);

  let noScoresMsg = document.createElement("p");
  noScoresMsg.setAttribute("class", "no-scores");
  mainEl.appendChild(noScoresMsg);

  let storedScores = JSON.parse(localStorage.getItem("scores"));

  mainEl.appendChild(scoresContainer);

  if (storedScores == null) {
    noScoresMsg.textContent = "Be the first to take the quiz and post a score!";
    scoresContainer.appendChild(playAgainBtn);
    playAgainBtn.textContent = "Play now!";
  } else {
    for (let i = 0; i < storedScores.length; i++) {
      let userScore = document.createElement("li");
      userScore.setAttribute("class", "user-scores");
      userScore.textContent =
        storedScores[i].initials + " - " + storedScores[i].score;
      scoresContainer.appendChild(userScore);
    }
    playAgainBtn.textContent = "Play again!";
    scoresContainer.appendChild(playAgainBtn);
  }
}

function reStartQuiz() {
  mainEl.textContent = "";
  clearInterval(time);
  timeEl.textContent = 0;
  currentQuestion = -1;
  currentChoice = -1;
  correctAnswer = 0;
  score = 0;
  timeLeft = 60;
  homePage();
}

startBtn.addEventListener("click", startQuiz);
playAgainBtn.addEventListener("click", reStartQuiz);

homePage();