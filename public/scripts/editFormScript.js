window.addEventListener('load', modifyTemplateSeconds(), true)

function modifyTemplateSeconds(){

    
    const activeTime = sessionActiveTime;
    const breakTime = sessionBreakTime;

    const templateActiveTime = new Date(activeTime * 1000).toISOString().slice(14, 19);
    const templateBreakTime = new Date(breakTime * 1000).toISOString().slice(14, 19);

    document.getElementById('activeTime').value = templateActiveTime;
    document.getElementById('breakTime').value = templateBreakTime;

}