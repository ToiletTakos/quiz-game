var timerEl = document.getElementById('time');
var startbtn = document.getElementById('start');
var quiz = document.getElementById('quiz');
var question = document.getElementById('questions');
var choiceOne = document.getElementById('one');
var choiceTwo = document.getElementById('two');
var choiceThree = document.getElementById('three');
var choiceFour = document.getElementById('four');
var startDisplay = document.getElementById('start-display');
var gameDisplay = document.getElementById('question-display');
var displayAnswer = document.getElementById('answer-display');
var timeOut= document.getElementById('time-out');
var gameOver = document.getElementById('game-over');

var timeLeft;
var showAnswer = 1;

// questions for quiz
var questions = [
    {
        question: "Commonly used data types DO NOT include?",
        choiceOne: "1. String",
        choiceTwo: "2. Boolean",
        choiceThree: "3. Alerts",
        choiceFour: "4. Numbers",
        correct: "three"
    },
    {
        question: "The condition in an if / else statment is enclosed within ____.",
        choiceOne: "1. quotes",
        choiceTwo: "2. Curly brackets",
        choiceThree: "3. parentheses",
        choiceFour: "4. Square brackets",
        correct: "three"
    },
    {
        question: "Arrays in JavaScript can be used to store ____:",
        choiceOne: "1. Numbers and strings",
        choiceTwo: "2. Other arrays",
        choiceThree: "3. Boolean",
        choiceFour: "4. All of the above",
        correct: "four"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables:",
        choiceOne: "1. Commas",
        choiceTwo: "2. Curly brackets",
        choiceThree: "3. Quotes",
        choiceFour: "4. Parentheses",
        correct: "three"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choiceOne: "1. JavaScript",
        choiceTwo: "2. Terminal/bash",
        choiceThree: "3. for loops",
        choiceFour: "4. console log",
        correct: "four"
    },
];

//creating question variables to keep track of positioning
var listQuestions = 0;
var lastQuestion = questions.length - 1;
    

//show questions
function showQuestion() {
    var quest = questions[listQuestions];

    question.innerHTML = quest.question;
    choiceOne.innerHTML = quest.choiceOne;
    choiceTwo.innerHTML = quest.choiceTwo;
    choiceThree.innerHTML = quest.choiceThree;
    choiceFour.innerHTML = quest.choiceFour;
}

//check the answer and also display correct or wrong
function checkAnswer(answer){
    if(questions[listQuestions].correct == answer){
        console.log('correct')
        var correctDisplay = setInterval(function() {
            // aslong as there is time left continue to count down
            if (showAnswer >= 0) {
                //display on
                displayAnswer.style.display = "block";
                //display answer choice
                displayAnswer.textContent = 'Correct!';
                // count down
                showAnswer--;
            }
            else {
                // return display to none
                displayAnswer.style.display = 'none';
                // clear the timer
                clearInterval(correctDisplay);
                //reset display timer to 1
                showAnswer = 1;
            }
        }, 500)
    }
    else{
        console.log('wrong');
        var wrongDisplay = setInterval(function() {
            // aslong as there is time left continue to count down
            if (showAnswer >= 0) {
                //display on
                displayAnswer.style.display = "block";
                //display answer choice
                displayAnswer.textContent = 'Wrong!';
                //count down
                showAnswer--;
            }
            else {
                // return display to blank
                displayAnswer.style.display = 'none';
                // clear the timer
                clearInterval(wrongDisplay);
                //reset display timer to 1
                showAnswer = 1;
            }
        }, 500)
        timeLeft = timeLeft - 5;
    }
    //move on to the next question aslong as we arent currently on the last question
    if(listQuestions < lastQuestion){
        listQuestions++;
        showQuestion();
    }
    //stop timer
    else{
        clearInterval(timeInterval);
        console.log('end of quiz');
    }
}

var timeInterval;
//timer 
function timer() {
timeInterval = setInterval(function() {
    // aslong as there is time left >= 1 continue to count down
    if (timeLeft >= 1) {
        timerEl.textContent = timeLeft;
        timeLeft--;
    }
    else {
        // When time is up display !! in time remaining 
        timerEl.textContent= '!!'
        // clear the timer
        clearInterval(timeInterval);
        gameDisplay.style.display = "none";
        timeOut.style.display = "block";
        gameOver.addEventListener('click', homeScreen);
    }
}, 1000)
}

//show opening screen
function homeScreen(){
    startDisplay.style.display = "flex";
    timeOut.style.display = "none";
}

// starting the quiz
function startGame() {
    timeLeft = 70;
    startDisplay.style.display = "none";
    showQuestion();
    gameDisplay.style.display = "block";
    timer();
    

}

startbtn.addEventListener("click", startGame);