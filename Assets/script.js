var timer = document.querySelector(`#timer`);
var timerCard = document.querySelector(`header`).children[1];
var submitHighscore = document.querySelector(`#submitHighscoreButton`);
var viewHighscores = document.querySelector(`#viewHighscoresButton`);
var clearHighscore = document.querySelector(`#clearButton`);
var answerEl = document.body.querySelector(`ul`);
var back = document.querySelector(`#backButton`);
var start = document.querySelector(`#startButton`);
var title = document.querySelecot(`#title`);

var questionObject = {
    questions:[
        //1
        //2
        //3
        //4
        //5
    ],
    answers: [
        [/*1*/],
        [/*2*/],
        [/*3*/],
        [/*4*/]
    ]
}

var globalTimer = 90;

var questionIndex = 0;
var timeLeft = globalTimer;
var score = 0;
var gameEnd = true;

function setUp() {
    timeLeft = globalTimer;
    timer.textContent = globalTimer;

    document.querySelector(`#highscore`).style.display = `none`;

    title.textContent = `Quiz Challenge`;

    title.style.display = `block`;
    document.querySelector(`#instructions`).style.display = `block`;
    viewHighscores.style.display = `block`;
    start.style.display = `block`;

    return;
}

function startGame() {
    gameEnd = false;
    questionIndex = 0;

    viewHighscores.style.display = `none`;
    start.style.display = `none`;
    document.querySelector(`#instructions`).style.display = `none`;
    timerCard.style.display = `block`;

    showQuestions(questionIndex);
    startTimer();

    return
}

function runTimer() {
    var timerInterval = setInterval(function() {
        if(gameEnd === true) {
            clearInterval(timerInterval);
            return;
        }
        if(timeLeft<1) {
            clearInterval(timerInterval);
            endGame();
        }

        timer.textContent =timeLeft;
        timeLeft--;
    }, 1000);
    return;
}

function showQuestions(currentQuestionIndex) {
    title.textContent = questionObject.questions[currentQuestionIndex];
    createAnswer(currentQuestionIndex);

    return;
}

function createAnswer(currentQuestionIndex) {
    answerEl.innerHTML = ``;

    for(let answerIndex = 0; answerIndex<questionObject.answers[currentQuestionIndex].length; answerIndex++) {
        var currentAnswer = document.createElement(`li`);
        var tempString = questionObject.answers[currentQuestionIndex][answerIndex];
        
        if(questionObject.answers[currentQuestionIndex][answerIndex].includes(`correct:`)){
            tempString = questionObject.answers[currentQuestionIndex][answerIndex].substring(8,questionObject.answers[currentQuestionIndex][answerIndex].length);
            currentAnswer.id =`correct`;
        }
        currentAnswer.textContent = tempString;
        answerEl.appendChild(currentAnswer);
    }
    return;
}

function nextQuestion() {
    questionIndex++;
    if(questionIndex >= questionObject.questions.length){
        endGame();
    } else {
        showQuestions(questionIndex);
    }
    return;
}

function endGame() {
    gameEnd = true;
    score = timeLeft;

    timerCard.style.display = `none`;
    title.style.display = `none`;
    answerEl.innerHtml = ``;

    document.querySelector(`#score`).textContent = score;
    document.querySelector(`#submit`).style.display = `block`;

    return;
}

function checkAnswer(event) {
    if(event.target != answerEl){
        if(!(event.target.id.includes('correct'))){
            timeLeft -= 10;
        }

        nextQuestion();
    }
    return;
}

function storeScoreAndName() {
    var highscoreText = document.querySelector(`input`);
    var tempArrayOfObjects = [];

    if(highscoreText.value != `` || highscoreText.value != null){
        var tempObject = {
            names: highscoreText.value,
            scores: score,
        }

        if(window.localStorage.getItem(`highscores`) == null){
            tempArrayOfObjects.push(tempObject);
            window.localStorage.setItem(`highscores`, JSON.stringify(tempArrayOfObjects));
        } else {
            tempArrayOfObjects = JSON.parse(window.localStorage.getItem(`highscores`));

            for(let i=0; i<=tempArrayOfObjects.length;i++) {
                if(i == tempArrayOfObjects.length) {
                    tempArrayOfObjects.push(tempObject);
                    break;
                } else if (tempArrayOfObjects[i].scores<score) {
                    tempArrayOfObjects.splice(index, 0, tempObject);
                    break;
                }
            }
            window.localStorage.setItem(`highscores`, JSON.stringify(tempArrayOfObjects));
        }
        document.querySelector(`input`).value = ``;
    }
    return;
}

function showHighscores() {
    title.style.display =`none`;
    start.style.display = `none`;
    document.querySelector(`header`).children[0].style.display =`none`;
    document.querySelector(`#instructions`).style.display = `none`;
    document.querySelector(`#submit`).style.display = `none`;

    document.querySelector(`#highscore`).style.display =`block`;

    tempOrderedList = document.querySelector(`ol`);
    tempOrderedList.innerHTML = ``

    tempArrayOfObjects = JSON.parse(window.localStorage.getItem(`highscores`));
    if(tempArrayOfObjects != null) {
        for(let i=0; i<tempArrayOfObjects.length; i++) {
            var newLi = document.createElement(`li`);
            newLi.textContent = tempArrayOfObjects[i].names +`-` + tempArrayOfObjects[index].scores;
            tempOrderedList.appendChild(newLi);
        }
    } else{
        var newLi = document.createElement(`p`);
        newLi.textContent = `No Highscores`;
        tempOrderedList.appendChild(newLi);
    }
    return;
}

function clearHighscores() {
    document.querysSelector(`ol`).innerHTML = ``;
    window.localStorage.clear();

    setUp();

    return;
}

function init() {
    start.addEventListener(`click`, startGame);
    answerEl.addEventListener(`click`, checkAnswer);
    viewHighscores.addEventListener(`click`, showHighscores);
    submitHighscore.addEventListener(`click`, storeScoreAndName);
    clearHighscore.addEventListener(`click`, clearHighscores);
    back.addEventListener(`click`, setUp);

    setUp();

    return;
}

init();