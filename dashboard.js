// ==============================
// POMODORO TIMER
// ==============================

let minutes = 25;
let seconds = 0;

let timer;
let isRunning = false;

const timeDisplay = document.getElementById("time");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

// Display Initial Time
updateDisplay();

function updateDisplay(){

    let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    let displaySeconds = seconds < 10 ? "0" + seconds : seconds;

    timeDisplay.innerHTML = `${displayMinutes}:${displaySeconds}`;

}

// ==============================
// START TIMER
// ==============================

startBtn.addEventListener("click", function(){

    if(isRunning) return;

    isRunning = true;

    timer = setInterval(function(){

        if(seconds === 0){

            if(minutes === 0){

                clearInterval(timer);

                isRunning = false;

                alert("Great Job!\nYour Pomodoro session has ended.");

                return;

            }

            minutes--;
            seconds = 59;

        }

        else{

            seconds--;

        }

        updateDisplay();

    },1000);

});

// ==============================
// PAUSE TIMER
// ==============================

pauseBtn.addEventListener("click", function(){

    clearInterval(timer);

    isRunning = false;

});

// ==============================
// RESET TIMER
// ==============================

resetBtn.addEventListener("click", function(){

    clearInterval(timer);

    isRunning = false;

    minutes = 25;
    seconds = 0;

    updateDisplay();

});

let customInterval;
let totalSeconds = 0;
let paused = false;

function updateCustomDisplay(){

    let hrs = Math.floor(totalSeconds / 3600);
    let mins = Math.floor((totalSeconds % 3600) / 60);
    let secs = totalSeconds % 60;

    document.getElementById("customDisplay").innerHTML =
        String(hrs).padStart(2,'0') + ":" +
        String(mins).padStart(2,'0') + ":" +
        String(secs).padStart(2,'0');
}

function startCustomTimer(){

    clearInterval(customInterval);

    let hrs = parseInt(document.getElementById("hours").value) || 0;
    let mins = parseInt(document.getElementById("minutes").value) || 0;
    let secs = parseInt(document.getElementById("seconds").value) || 0;

    totalSeconds = hrs*3600 + mins*60 + secs;

    if(totalSeconds <= 0){
        alert("Please enter a valid time.");
        return;
    }

    paused = false;
    updateCustomDisplay();

    customInterval = setInterval(function(){

        if(!paused){

            if(totalSeconds > 0){

                totalSeconds--;
                updateCustomDisplay();

            }else{

                clearInterval(customInterval);

                alert("Time's Up!");

            }

        }

    },1000);

}

function pauseCustomTimer(){

    paused = true;

}

function resumeCustomTimer(){

    paused = false;

}

function resetCustomTimer(){

    clearInterval(customInterval);

    totalSeconds = 0;

    paused = false;

    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";

    updateCustomDisplay();

}

updateCustomDisplay();

const quotes = [

"Education is the most powerful weapon which you can use to change the world. ",

"Success is not final, failure is not fatal; it is the courage to continue that counts. ",

"The pain of studying is temporary. The pride of achievement lasts much longer. ",

"Stop being lazy, people with real problems still get straight A’s",

"A focused mind creates a successful future. ",

"'Ilmu dan maksiat tidak akan pernah bersatu.' ",

"Study hard, kan nak JJ result ??"

];

const quoteText = document.getElementById("quote");
const shuffleBtn = document.getElementById("newQuote");

function shuffleQuote(){

    const random = Math.floor(Math.random() * quotes.length);

    quoteText.textContent = quotes[random];

}

shuffleBtn.addEventListener("click", shuffleQuote);

// Papar quote rawak apabila dashboard dibuka
shuffleQuote();