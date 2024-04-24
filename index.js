document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById("toggle-button");
    const timerElement = document.getElementById("timer");
    var timer;
    var isTimerRunning = false;
    var blockSocialMedias = false; 

    var pomodoroTime = 25;
    var shortBreak = 5;
    var longBreak = 15;
    var breakTime = false;

    function startTimer(){
        let timeParts = timerElement.textContent.split(":");
        let minutes = parseInt(timeParts[0]);
        let seconds = parseInt(timeParts[1]);

        timer = setInterval(function() {
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                if (minutes < 0) {
                    clearInterval(timer);
                    isTimerRunning = false;
                    minutes = 0;
                    seconds = 0;
                    timerElement.textContent = "00:00";
                    toggleButton.textContent = "start";
                }
            }

            let formattedTime = 
                (minutes < 10 ? "0" + minutes : minutes) + ":" +
                (seconds < 10 ? "0" + seconds : seconds);
            timerElement.textContent = formattedTime;

        }, 1000);
    }

    function stopTimer(){
        const timerElement = document.getElementById("timer");
        clearInterval(timer);
        isTimerRunning = false;
        toggleButton.textContent = "start";
        timerElement.textContent = pomodoroTime + ":00";
    }

    toggleButton.addEventListener('click', () => {
        const timerElement = document.getElementById("timer");
        if (!isTimerRunning) {
            toggleButton.textContent = "stop";
            startTimer();
            isTimerRunning = true;
            if(blockSocialMedias == false || breakTime == true){
                return;
            }
            let time = timerElement.textContent.split(":")[0] * 60000;
            window.electronAPI.startTimer(time);
        } else {
            stopTimer();
            window.electronAPI.stopTimer();
        }
    });

    const optionButton = document.getElementById("option-button");

    function showOptions(){
        const optionMenu = document.getElementById("option-menu");
        if(optionMenu.style.display != "flex")
        {
            optionMenu.style.display = "flex";
        }
        else
        {
            optionMenu.style.display = "none";
        }

    }

    optionButton.addEventListener('click', () => {
        showOptions();
    });

    const applyBtn = document.getElementById("apply-btn");

    function applyOptions(){
        const desiredTime = document.getElementById("desired-time");
        pomodoroTime = desiredTime.value;

        const desiredShortBreak = document.getElementById("desired-short-time");
        shortBreak = desiredShortBreak.value;
        const desiredLongBreak = document.getElementById("desired-long-time");
        longBreak = desiredLongBreak.value;

        const blockSocialMediaCheckBox = document.getElementById("block-social-media-btn");
        blockSocialMedias = blockSocialMediaCheckBox.value;
    }

    applyBtn.addEventListener("click", () => {
        applyOptions();
        showOptions();
    });

    const textTimer = document.getElementById("text-timer");

    const pomodoroBtn = document.getElementById("pomodoro-btn");
    
    pomodoroBtn.addEventListener("click", () =>{
        breakTime = false;
        timerElement.textContent = pomodoroTime +":00"
        textTimer.textContent = "Pomodoro Timer";
    })

    const shortBreakBtn = document.getElementById("short-break-btn");
    
    shortBreakBtn.addEventListener("click", () =>{
        breakTime = true;
        timerElement.textContent = shortBreak +":00"
        textTimer.textContent = "Short Break";
    })

    const longBreakBtn = document.getElementById("long-break-btn");
    
    longBreakBtn.addEventListener("click", () =>{  
        breakTime = true;
        timerElement.textContent = longBreak +":00"
        textTimer.textContent = "Long Break";
    })


});
