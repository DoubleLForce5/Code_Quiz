// view highscore need clickable
// welcome info is replaced wih questions
const mainEl = document.querySelector('main');
const timeEl = document.querySelector('.count-down');

// counts down from 75
let timeLeft = 60;

// list of questions 
const questions = [
  {
    question: 'question1',
    optionA: 'choice1',
    optionB: 'choice2',
    optionC: 'choice3',
    optionD: 'choice4'
  },
  {
    question: 'question2',
    optionA: 'choice1',
    optionB: 'choice2',
    optionC: 'choice3',
    optionD: 'choice4'
  },
  {
    question: 'question3',
    optionA: 'choice1',
    optionB: 'choice2',
    optionC: 'choice3',
    optionD: 'choice4'
  },
  {
    question: 'question3',
    optionA: 'choice1',
    optionB: 'choice2',
    optionC: 'choice3',
    optionD: 'choice4'
  },
  {
    question: 'question4',
    optionA: 'choice1',
    optionB: 'choice2',
    optionC: 'choice3',
    optionD: 'choice4'
  },
  {
    question: 'question5',
    optionA: 'choice1',
    optionB: 'choice2',
    optionC: 'choice3',
    optionD: 'choice4'
  },
  {
    question: 'question6',
    optionA: 'choice1',
    optionB: 'choice2',
    optionC: 'choice3',
    optionD: 'choice4'
  }
]

// landing info
let welcomeDiv = document.createElement('div'); 
welcomeDiv.textContent = 'hello';
mainEl.appendChild(welcomeDiv);

// start button 
let startBtn = document.createElement('button');
startBtn.textContent = 'Start'
mainEl.appendChild(startBtn)

// onclick of start button timer should begin 
function startQuiz() {
  timer()
  displayQuestions()

}

function timer() {
  const time = setInterval(function(){
    timeLeft --;
    timeEl.textContent = timeLeft;
  
    // conditional 
      // if quiz completed before timer hits 0 end game 
      // else if timer hits 0 end game 
  
    //else if(timeLeft === 0){
      // end Game function take to highscore screen 
    //}
    if(timeLeft === 0){
      clearInterval(time)
    }
  
  }, 1000);
}

function displayQuestions() {
  mainEl.removeChild(welcomeDiv)
  mainEl.removeChild(startBtn)

  for(let i = 0; i < questions.length; i++){
    let questionEl = document.createElement('div');
    questionEl.setAttribute('class', 'question');
    questionEl.textContent = questions[i].question;
    mainEl.appendChild(questionEl);
  }

  // if select answer c give point and move to next questions display message - correct 
  
  // else if answer is wrong subtract 5 second from clock and display message - wrong 

}








// on click of enter score initials submit button  
// clear the timer
// clearInterval(timerCountdown)






startBtn.addEventListener('click', startQuiz);