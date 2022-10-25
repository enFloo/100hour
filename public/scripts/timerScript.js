
//add zeros and colon to timer active/break time
window.addEventListener("load", editInput(), true); function editInput(){
    //grabbing values for timer function
    let activeTime = document.getElementById('activeTime').textContent;
    let breakTime = document.getElementById('breakTime').textContent;


    if(activeTime.length == 4){
        activeTime = activeTime.replace(/(.{2})$/,':$1')
        document.getElementById('activeTime').innerHTML = activeTime
    
    }else{
        activeTime = activeTime.padStart(4, '0').replace(/(.{2})$/,':$1')
        document.getElementById('activeTime').innerHTML = activeTime
    }

    if(breakTime.length == 4){
        breakTime = breakTime.replace(/(.{2})$/,':$1');
        document.getElementById('breakTime').innerHTML = breakTime
    
    }else{
        breakTime = breakTime.padStart(4, '0').replace(/(.{2})$/,':$1')
        document.getElementById('breakTime').innerHTML = breakTime
    }

};

window.addEventListener('load', app(), true); function app(){
    const semiCircles = document.querySelectorAll('.semiCircle');
    const timer = document.querySelector('.timer')

    //input
    const activeMin = 0;
    const activeSec = 15;
    const breakMin = 0;
    const breakSec = 0;

    const activeMinutes = activeMin * 60000;
    const activeSeconds = activeSec * 1000;
    const breakMinutes = breakMin * 60000;
    const breakSeconds = breakSec * 1000;
    const activeSetTime = activeMinutes + activeSeconds;
    const breakSetTime = breakMinutes + breakSeconds;
    const starTime = Date.now();
    const activeFutureTime = starTime + activeSetTime;
    const breakFutureTime = starTime + breakSetTime;

    const timerLoop = setInterval(countDownTimer);
    countDownTimer();

    function countDownTimer(){
        const currentTime = Date.now()
        const activeRemainingTime = activeFutureTime - currentTime;
        const breakRemainingTime = breakFutureTime - currentTime;
        const activeAngle = (activeRemainingTime / activeSetTime) * 360;
        const breakAngle = (breakRemainingTime / breakSetTime) * 360;


        // Active progress indicator
        if(activeAngle > 180){
            semiCircles[2].style.display = 'none';
            semiCircles[0].style.transform = 'rotate(180deg)';
            semiCircles[1].style.transform = 'rotate(${activeAngle}deg)';
        }else{
            semiCircles[2].style.display = 'block';
            semiCircles[0].style.transform = 'rotate(activeAngle}deg)';
            semiCircles[1].style.transform = 'rotate(${activeAngle}deg)';
        }


        //timer
        const activeMin = Math.floor((activeRemainingTime / (1000 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        const activeSec = Math.floor((activeRemainingTime/ 1000) % 6000);

        timer.innerHTML = `
        <div> ${activeMin}</div>
        <div class="colon">:</div>
        <div> ${activeSec}</div>`;

        //5sec-condition
        if(activeRemainingTime <= 6000){
            semiCircles[0].style.backgroundColor = 'red';
            semiCircles[1].style.background = 'red';
            timer.style.color = 'red';
        }

        //end
        if(activeRemainingTime < 0){
            clearInterval(timerLoop);
            semiCircles[0].style.display = 'none';semiCircles[1].style.display = 'none';semiCircles[2].style.display = 'none';

            timer.innerHTML = `
            <div>00</div>
            <div class="colon">:</div>
            <div>00</div>`;

            timer.style.color = 'lightgray'

        }

    }
}


window.addEventListener('laod', formatTimeLeft(), true); function formatTimeLeft(){
    let activeMinutes = 0;
    let activeSeconds = 0; 
    let activeTotalSeconds = 0;
    let breakMinutes = 0;
    let breakSeconds = 0; 
    let breakTotalSeconds = 0;
    

    //grabbing timer instructions from Timer-show page
    activeTime = document.getElementById('activeTime').textContent
    breakTime = document.getElementById('breakTime').textContent

    //turning active timer instructions into numbers and variables
    activeMinutes = Number(activeTime.slice(0,2));
    activeSeconds = Number(activeTime.slice(3,5));

    //getting total active seconds
    activeTotalSeconds = (activeMinutes * 60) + activeSeconds;



    //turning break timer instructions into numbers and variables
    breakMinutes = Number(breakTime.slice(0,2));
    breakSeconds = Number(breakTime.slice(3,5));

    //getting total break seconds
    breakTotalSeconds = (breakMinutes * 60) + breakSeconds;


    //adding padded 0's
    if(activeMinutes <10){
        activeMinutes = `0${activeMinutes}`;
    }

    if(activeSeconds <10){
        activeSeconds = `0${activeSeconds}`;
    }

    return  `${activeMinutes}:${activeSeconds}`;
}



