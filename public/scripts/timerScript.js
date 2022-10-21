
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

window.addEventListener('laod', timer(), true); function timer(){
    document.getElementById("app").innerHTML = `
        <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="base-timer__circle">
            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            </g>
        </svg>
        <span id="base-timer-label" class="base-timer__label">
            
        </span>
        </div>

        <!-- Timer Control buttons -->
            <section class="container controlButtonsContainer">
                <button class="btn controlButtons"><i class="fa fa-play"></i></button>
                <button class="btn  controlButtons"><i class="fa fa-duotone fa-pause"></i></button>
                <button class="btn  controlButtons"><i class="fa-solid fa-clock-rotate-left"></i></button>
               
            </section>
        `
}

window.addEventListener('load', timerFunctions(activeTime), true); function timerFunctions(activeTime){
    let activeMinutes = 0;
    let activeSeconds = 0;
    let breakMinutes = 0;
    let breakSeconds = 0; 

    activeTime = document.getElementById('activeTime').textContent
    breakTime = document.getElementById('breakTime').textContent

    activeMinutes = Number(activeTime.slice(0,2));
    activeSeconds = Number(activeTime.slice(3,5));

    breakMinutes = Number(breakTime.slice(0,2));
    breakSeconds = Number(breakTime.slice(3,5));

    if(activeSeconds <10){
        activeSeconds = `0${activeSeconds}`;
    }

    return  `${activeMinutes}:${activeSeconds}`;

    
    

    
}

