
// Function that shows timer progress with a colored ring
function update_circle() {
    let currentAngle = (activeTimeRemaining / sessionActiveTime) * 360;
    
    
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
    if (activeTimeRemaining <= 5) {
        semiCircleElements[0].style.backgroundColor = 'red';
        semiCircleElements[1].style.background = 'red';
        timerDisplayElm.style.color = 'red';
    }   

    if (activeTimeRemaining <= 0) { // switch to break time
        clearInterval(activeInterval);
        endRoundAlarm.play();
        incrementRoundsCompleted();
        semiCircleElements[0].style.backgroundColor = '#8B088B';
        semiCircleElements[1].style.backgroundColor = '#8B088B';
        breakTimeRemaining = sessionBreakTime;
        breakTimerDisplayElm.style.display = 'block'; // shows break time in circle
        breakTimerDisplayElm.innerText = format_timer(breakTimeRemaining); //Shows break time in circle 
        timer(); 
    }
}

function update_break_circle(){
    let breakCurrentAngle = (breakTimeRemaining / sessionBreakTime) * 360;
    
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

    if(breakTimeRemaining <= 0) { // switch to active time
        clearInterval(breakInterval);
        breakTimerDisplayElm.style.display = 'none' //hides active time in circle
        incrementRoundsCompleted();
        intervalsLeftElm.innerText = incrementIntervalsCompleted();
        if(intervalsLeft >= 1){
            endRoundAlarm.play();
        }
        semiCircleElements[0].style.backgroundColor = '#088b8b';
        semiCircleElements[1].style.backgroundColor = '#088b8b';
        timerDisplayElm.style.display = 'block'; // shows break time in circle
        timerDisplayElm.style.color = '#088b8b';
        activeTimeRemaining = sessionActiveTime;
        timerDisplayElm.innerText = format_timer(activeTimeRemaining); //Shows break time in circle 
        update_circle();
        timer();      
    }

    if( breakTimeRemaining == 0 && intervalsLeft == 0){
        clearInterval(activeInterval)
        workoutCompleteAlarm.play();
        timerDisplayElm.style.color = 'lightgray';
        timerDisplayElm.innerText = 'Workout Complete';
        semiCircleElements[0].style.backgroundColor = 'none';
        semiCircleElements[1].style.backgroundColor = 'none';
        
        
    }
}

function incrementIntervalsCompleted(){ // Two roundsCompeleted equals one Interval completed
    intervalsCompleted = intervalsCompleted + 1;
    intervalsLeft = totalIntervals - intervalsCompleted

    return `Rounds Left: ${intervalsLeft}`;
}

function incrementRoundsCompleted(){
    roundsCompleted = roundsCompleted + 1;
    
    
}


function format_timer(totalSeconds) {
    var date = new Date(0);
    date.setSeconds(totalSeconds);
    var timeString = date.toISOString().substring(14, 19);
    return timeString;
}

function timer(){
    
    if(roundsCompleted % 2 == 0){
        
        activeInterval = setInterval(() =>{
            activeTimeRemaining-- //decrements total time
            timerDisplayElm.innerText = format_timer(activeTimeRemaining); //Shows time in circle
            update_circle();// timer bar animation
        },1000)
    }

    if(roundsCompleted % 2 !== 0){
        timerDisplayElm.style.display = 'none' //hides active time in circle
        breakTimerDisplayElm.style.color = '#8B088B';
        update_break_circle();
        
        breakInterval = setInterval(() =>{ 
            breakTimeRemaining-- //decrements total break time
            breakTimerDisplayElm.innerText = format_timer(breakTimeRemaining); //Shows break time in circle
            update_break_circle();
        },1000)
    }
}

function pause_timer() {
    if(!isPaused){
        if(activeInterval){
            clearInterval(activeInterval);
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
        timer();
        isPaused = false; 
    }
    
    console.log("resume_timer") 
}

function restart_timer() {
    clearInterval(activeInterval);
    clearInterval(breakInterval);
    roundsCompleted = 0;
    intervalsCompleted = 0;
    if(timerDisplayElm.style.display = 'none'){
        timerDisplayElm.style.display = 'block';
    }
    breakTimerDisplayElm.style.display = 'none';
    timerDisplayElm.style.color = '#088b8b'; //changes timer font color
    semiCircleElements[0].style.backgroundColor = '#088b8b';
    semiCircleElements[1].style.backgroundColor = '#088b8b';
    activeTimeRemaining = sessionActiveTime;
    breakTimeRemaining = sessionBreakTime;
    timerDisplayElm.innerText = format_timer(activeTimeRemaining); //Shows time in circle
    update_circle();
    timer();
    isPaused = false;
    console.log('restarted time');
    
    
}

//
// Global state
//
let isPaused = true;
let activeTimeRemaining = null;
let breakTimeRemaining = null;
let totalIntervals = null;
let intervalsCompleted = 0;
let activeInterval = null;
let breakInterval = null;
let roundsCompleted = 0;
let intervalsLeft = sessionNumberOfRounds
const timerDisplayElm = document.getElementById('timerDisplay');
const breakTimerDisplayElm = document.getElementById('breakTimerDisplay');
const semiCircleElements = document.querySelectorAll('.semiCircle');
const intervalsLeftElm = document.getElementById('intervalsLeft');
let endRoundAlarm = new Audio('/assets/audio/443345__tec-studio__alarm-sound-002.wav');
let workoutCompleteAlarm = new Audio('/assets/audio/610561__brickdeveloper171__alien-signal-4.wav');

window.addEventListener('load', app(), true);

function app() {
    activeTimeRemaining = sessionActiveTime;
    breakTimeRemaining = sessionBreakTime;
    totalIntervals = sessionNumberOfRounds;
    
    

    breakTimerDisplayElm.style.display = 'none'
    timerDisplayElm.style.color = '#088b8b'; //changes timer font color
    timerDisplayElm.innerText = format_timer(activeTimeRemaining); //Shows time in circle
    update_circle();// timer bar animation

    // Handle pause and resume buttons
    document.getElementById('startButton').onclick = resume_timer;
    document.getElementById('pauseButton').onclick = pause_timer;
    document.getElementById('restartButton').onclick = restart_timer;
    // Show number of intervals left in template
    
    intervalsLeftElm.innerText = `Rounds left: ${totalIntervals}`;
}




