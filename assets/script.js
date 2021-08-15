// view highscore need clickable
// welcome info is replaced wih questions
const mainEl = document.querySelector("main");
const timeEl = document.querySelector(".count-down");

let currentQuestion = -1;
let currentChoice = -1;

let score = 0;
let correctAnswer = 0;

// counts down from 75
let timeLeft = 60;
let time;

let rightAnswer = document.createElement('div')
rightAnswer.setAttribute('class', 'right-answer')
// rightAnswer.textContent;
// list of questions
const questions = [
  {
    question: "question1",
    choices: ["a", "d", "c", "d"],
    answer: "a",
  },
  {
    question: "question2",
    choices: ["a", "d", "c", "d"],
    answer: "c",
  },
  {
    question: "question3",
    choices: ["a", "d", "c", "d"],
    answer: "b",
  },
  {
    question: "question4",
    choices: ["a", "d", "c", "d"],
    answer: "a",
  },
  {
    question: "question5",
    choices: ["a", "d", "c", "d"],
    answer: "a",
  },
  {
    question: "question6",
    choices: ["a", "d", "c", "d"],
    answer: "a",
  },
  {
    question: "question7",
    choices: ["a", "d", "c", "d"],
    answer: "a",
  },
];

// landing info
let welcomeDiv = document.createElement("div");
welcomeDiv.textContent = "hello";
mainEl.appendChild(welcomeDiv);

// start button
let startBtn = document.createElement("button");
startBtn.textContent = "Start";
mainEl.appendChild(startBtn);

// onclick of start button timer should begin
function startQuiz() {
  timer();
  renderQuiz();
  nextQuestion();
}

function timer() {
    time = setInterval(function () {
    timeLeft--;
    timeEl.textContent = timeLeft;

    // conditional
    // if quiz completed before timer hits 0 end game
    // else if timer hits 0 end game

    //else if(timeLeft === 0){
    // end Game function take to highscore screen
    //}
    if (timeLeft === 0) {
      clearInterval(time);
    }
  }, 1000);
}

function renderQuiz() {
  mainEl.removeChild(welcomeDiv);
  mainEl.removeChild(startBtn);

  if (questions.length > 6 || timer > 0) {
    console.log(questions.length);
  }
}

function nextQuestion() {
  currentQuestion++;

  if (!questions[currentQuestion]) {
    return endQuiz()
  }

  let questionEl = document.createElement("div");
  questionEl.setAttribute("class", "question");
  questionEl.textContent = questions[currentQuestion].question;
  mainEl.appendChild(questionEl);

  let quizChoices = questions[currentQuestion].choices;
  let choiceEl = document.createElement("div");
  mainEl.appendChild(choiceEl);

  quizChoices.forEach((choice) => {
    let choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice-btn");
    choiceBtn.setAttribute("data", choice);
    choiceBtn.textContent = choice;

    currentChoice++;
    choiceEl.appendChild(choiceBtn);

    mainEl.appendChild(rightAnswer)

    choiceBtn.addEventListener("click", checkAnswer);
  });
}

function checkAnswer() {
  if (this.getAttribute("data") == questions[currentQuestion].answer) {
    correctAnswer++;
    score += 5;
    rightAnswer.textContent = 'Right!'
    // alert('right!')
  } else {
    timeLeft -= 5;
    // alert('wrong!')
    rightAnswer.textContent = 'Wrong!'
  }

  document.querySelector(".main-content").textContent = "";
  nextQuestion();
}



function endQuiz() {
  clearInterval(time)

  // All done 
  // score is _
  // enter initials - submit button 
}


startBtn.addEventListener("click", startQuiz);
