function format_timer(totalSeconds) {
    // From: https://stackoverflow.com/a/25279399
    var date = new Date(0);
    date.setSeconds(totalSeconds);
    var timeString = date.toISOString().substring(14, 19);
    return timeString;
}

function update_timer() {
    if (timeRemaining > 0) {
        timeRemaining = timeRemaining - 1;
    }
    timerDisplayElm.innerText = format_timer(timeRemaining);
    
    update_circle();
}

function update_break_timer(){
    if(breakTimeRemaining > 0){
        breakTimeRemaining = breakTimeRemaining - 1;
    }
    breakTimerDisplayElm.innerText = format_timer(breakTimeRemaining);
    update_break_circle();
}

// Function that shows timer progress with a colored ring
function update_circle() {
    let currentAngle = (timeRemaining / sessionActiveTime) * 360;
    semiCircleElements[0].style.backgroundColor = '#088b8b';
    semiCircleElements[1].style.backgroundColor = '#088b8b';
    
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
        incrementRoundsCompleted();
        breakTimeOn(); // makes breakTimer numbers and circle appear
        
        
    }
}

function update_break_circle(){
    let breakCurrentAngle = (breakTimeRemaining / sessionBreakTime) * 360;
    let roundsLeft = (numberOfRoundsTotal * 2) - roundsCompleted;
    semiCircleElements[0].style.backgroundColor = '#8B088B';
    semiCircleElements[1].style.backgroundColor = '#8B088B';

    // Break progress indicator
    if (breakCurrentAngle > 180) {
        semiCircleElements[0].style.transform = 'rotate(180deg)';
        semiCircleElements[1].style.transform = `rotate(${breakCurrentAngle}deg)`;
        semiCircleElements[2].style.display = 'none';
        breakTimerDisplayElm.style.color = '#8B088B';
    } else {
        semiCircleElements[0].style.transform = `rotate(${breakCurrentAngle}deg)`;
        semiCircleElements[1].style.transform = `rotate(${breakCurrentAngle}deg)`;
        semiCircleElements[2].style.display = 'block';
    }

    // 5sec-condition
    if (breakTimeRemaining <= 5) {
        semiCircleElements[0].style.backgroundColor = 'red';
        semiCircleElements[1].style.background = 'red';
        breakTimerDisplayElm.style.color = 'red';
    }

    if(roundsCompleted === 12){
        pause_timer();
        clearInterval(breakTimeRemaining)
        clearInterval(timeRemaining)
        semiCircleElements[0].style.display = 'none';
        semiCircleElements[1].style.display = 'none';
        semiCircleElements[2].style.display = 'none';
        timerDisplayElm.style.color = 'lightgray';
        breakTimerDisplayElm.innerText = "Workout Complete!"
    }

    if (breakTimeRemaining <= 0 && roundsCompleted < 12) {
        clearInterval(breakInterval);
        incrementRoundsCompleted();
        isPaused = true;
        activeTimeOn();
    }

}
function incrementRoundsCompleted(){
    roundsLeft = numberOfRoundsTotal - roundsCompleted;
    roundsCompleted = roundsCompleted + 1;
    
}

function breakTimeOn(){
    timerDisplayElm.style.display = 'none';
    breakTimerDisplayElm.style.display = 'block';
    breakTimerDisplayElm.style.color = '#8B088B'
    breakTimerDisplayElm.innerText = format_timer(breakTimeRemaining);
    break_interval();
    
}

function activeTimeOn(){
    breakTimerDisplayElm.style.display = 'none';
    timerDisplayElm.style.display = 'block';
    timerDisplayElm.style.color = '#088b8b'; 
    timeRemaining = sessionActiveTime;
    update_circle();
    timerDisplayElm.innerText = format_timer(timeRemaining)
    resume_timer();
    

}

function break_interval(){
    update_break_timer();
    breakInterval = setInterval(update_break_timer, 1000);  
    
}

function pause_timer() {
    if(!isPaused){
        if(timerInterval){
            clearInterval(timerInterval);
        }

        if(breakInterval){
            clearInterval(breakInterval)
        }
        isPaused = true;
    }
    console.log('pause_timer') 
    
    
}

function resume_timer() {

    if(isPaused){  
        if(roundsCompleted % 2 ==0){
            update_timer();
            timerInterval = setInterval(update_timer, 1000);
        } 
        
        if(roundsCompleted % 2 !==0){
            break_interval();
        }

    }
    
    isPaused = false; 
    console.log("resume_timer") 
}

function restart_timer() {
    pause_timer();
    numberOfRoundsTotal = 0;

    if(roundsCompleted % 2 ==0){
        timeRemaining = sessionActiveTime;
    } 
    
    if(roundsCompleted % 2 !==0){
        breakTimeRemaining = sessionBreakTime;
    }
    resume_timer();
    
}




//
// Global state
//
let isPaused = true;
let timeRemaining = null;
let breakTimeRemaining = null;
let numberOfRoundsTotal = null;
let timerInterval = null;
let breakInterval = null;
let roundsCompleted = 0;
const timerDisplayElm = document.getElementById('timerDisplay');
const breakTimerDisplayElm = document.getElementById('breakTimerDisplay');
const semiCircleElements = document.querySelectorAll('.semiCircle');

window.addEventListener('load', app(), true);

function app() {
    timeRemaining = sessionActiveTime;
    breakTimeRemaining = sessionBreakTime;
    numberOfRoundsTotal = sessionNumberOfRounds;

    breakTimerDisplayElm.style.display = 'none';
    timerDisplayElm.innerText = format_timer(timeRemaining);

    update_circle();
    
    
    

    // Handle pause and resume buttons
    document.getElementById('startButton').onclick = resume_timer;
    document.getElementById('pauseButton').onclick = pause_timer;
    document.getElementById('restartButton').onclick = restart_timer;
}
