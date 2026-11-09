// =============================
// STUDYHUB TIMER
// =============================

let minutes = 25;
let seconds = 0;

let timer = null;
let isRunning = false;

const timeDisplay = document.getElementById("time");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const pomodoroBtn = document.getElementById("pomodoroBtn");
const shortBtn = document.getElementById("shortBtn");
const longBtn = document.getElementById("longBtn");

// =============================
// DISPLAY TIME
// =============================

function updateDisplay(){

    let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    let displaySeconds = seconds < 10 ? "0" + seconds : seconds;

    timeDisplay.textContent = `${displayMinutes}:${displaySeconds}`;

}

updateDisplay();

// =============================
// START TIMER
// =============================

function startTimer(){

    if(isRunning) return;

    isRunning = true;

    timer = setInterval(function(){

        if(seconds === 0){

            if(minutes === 0){

                clearInterval(timer);

                isRunning = false;

                alert("Time's up! Take a break.");

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

}

// =============================
// PAUSE TIMER
// =============================

function pauseTimer(){

    clearInterval(timer);

    isRunning = false;

}

// =============================
// RESET TIMER
// =============================

function resetTimer(){

    clearInterval(timer);

    isRunning = false;

    if(pomodoroBtn.classList.contains("active")){

        minutes = 25;

    }

    else if(shortBtn.classList.contains("active")){

        minutes = 5;

    }

    else{

        minutes = 15;

    }

    seconds = 0;

    updateDisplay();

}

// =============================
// CHANGE MODE
// =============================

function changeMode(time){

    clearInterval(timer);

    isRunning = false;

    minutes = time;
    seconds = 0;

    updateDisplay();

}

// =============================
// BUTTON EVENTS
// =============================

startBtn.addEventListener("click", startTimer);

pauseBtn.addEventListener("click", pauseTimer);

resetBtn.addEventListener("click", resetTimer);

// =============================
// MODE BUTTONS
// =============================

pomodoroBtn.addEventListener("click", function(){

    pomodoroBtn.classList.add("active");
    shortBtn.classList.remove("active");
    longBtn.classList.remove("active");

    changeMode(25);

});

shortBtn.addEventListener("click", function(){

    shortBtn.classList.add("active");
    pomodoroBtn.classList.remove("active");
    longBtn.classList.remove("active");

    changeMode(5);

});

longBtn.addEventListener("click", function(){

    longBtn.classList.add("active");
    pomodoroBtn.classList.remove("active");
    shortBtn.classList.remove("active");

    changeMode(15);

});

// =============================
// DEFAULT MODE
// =============================

pomodoroBtn.classList.add("active");

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