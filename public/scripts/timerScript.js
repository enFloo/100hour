function format_timer(totalSeconds) {
    // From: https://stackoverflow.com/a/25279399
    var date = new Date(0);
    date.setSeconds(totalSeconds);
    var timeString = date.toISOString().substring(14, 19);
    console.log(timeString)
    return timeString;
}

function update_timer() {
    if (timeRemaining > 0) {
        timeRemaining = timeRemaining - 1;
    }
    timerDisplayElm.innerText = format_timer(timeRemaining);
    update_circle();
}

function update_circle() {
    let currentAngle = (timeRemaining / sessionActiveTime) * 360;
    
    // Active progress indicator
    if (currentAngle > 180) {
        semiCircleElements[0].style.transform = 'rotate(180deg)';
        semiCircleElements[1].style.transform = `rotate(${currentAngle}deg)`;
        semiCircleElements[2].style.display = 'none';
        timerDisplayElm.style.color = '#088b8b';
    } else {
        semiCircleElements[0].style.transform = `rotate(${currentAngle}deg)`;
        semiCircleElements[1].style.transform = `rotate(${currentAngle}deg)`;
        semiCircleElements[2].style.display = 'block';
    }

    // 5sec-condition
    if (timeRemaining <= 5) {
        semiCircleElements[0].style.backgroundColor = 'red';
        semiCircleElements[1].style.background = 'red';
        timerDisplayElm.style.color = 'red';
    }

    if (timeRemaining <= 0) {
        clearInterval(timerInterval); // Clear the timer loop
        semiCircleElements[0].style.display = 'none';
        semiCircleElements[1].style.display = 'none';
        semiCircleElements[2].style.display = 'none';
        timerDisplayElm.style.color = 'lightgray';
    }
}

function pause_timer() {
    if (!isPaused) {
        clearInterval(timerInterval); // Clear the timer loop
        isPaused = true;
    }
}

function resume_timer() {
    if (isPaused) {
        update_timer();
        timerInterval = setInterval(update_timer, 1000);
        isPaused = false;
    }
}

function restart_timer() {
    pause_timer();
    timeRemaining = sessionActiveTime;
    resume_timer();
    
}



//
// Global state
//
let isPaused = true;
let timeRemaining = null;
let timerInterval = null;
const timerDisplayElm = document.getElementById('timerDisplay');
const semiCircleElements = document.querySelectorAll('.semiCircle');

window.addEventListener('load', app(), true);

function app() {
    timeRemaining = sessionActiveTime;

    timerDisplayElm.innerText = format_timer(timeRemaining);
    update_circle();

    // Handle pause and resume buttons
    document.getElementById('startButton').onclick = resume_timer;
    document.getElementById('pauseButton').onclick = pause_timer;
    document.getElementById('restartButton').onclick = restart_timer;
}
