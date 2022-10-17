let activeTime = document.getElementById('activeTime').getAttribute('value');
let breakTime = document.getElementById('breakTime').getAttribute('value');

window.onload = function editInput(){
    //add missing 0's
    //turn it inot a string
    //add colon
    //return new input as value

    if(activeTime.length == 4){
        String(activeTime);
        activeTime = activeTime.replace(/(.{2})$/,':$1');
        document.getElementById('activeTime').value = activeTime
    
    }else{
        alert('dis bihh less than foe')
    }

    if(breakTime.length == 4){
        String(breakTime);
        breakTime = breakTime.replace(/(.{2})$/,':$1');
        document.getElementById('breakTime').value = breakTime
    
    }else{
        alert('dis bihh less than foe')
    }
    
}