let activeTime = document.getElementById('activeTime').getAttribute('value');
let breakTime = document.getElementById('breakTime').getAttribute('value');

//adding colong and leading zeros to start and break time
window.onload = function editInput(){
    if(activeTime.length == 4){
        activeTime = String(activeTime).replace(/(.{2})$/,':$1');
        document.getElementById('activeTime').value = activeTime
    
    }else{
        activeTime = String(activeTime).padStart(4, '0').replace(/(.{2})$/,':$1')
        document.getElementById('activeTime').value = activeTime
    }

    if(breakTime.length == 4){
        String(breakTime);
        breakTime = breakTime.replace(/(.{2})$/,':$1');
        document.getElementById('breakTime').value = breakTime
    
    }else{
        breakTime = String(breakTime).padStart(4, '0').replace(/(.{2})$/,':$1')
        document.getElementById('breakTime').value = breakTime
    }
    
}