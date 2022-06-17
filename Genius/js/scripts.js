const data = {
    gameOn: false,
    timeOut: undefined,
    sounds: [],

    strict: false,
    playerCanPlay: false,
    score: 0,
    gameSequece: [],
    playerSequece: []
};

const gui = {
    counter: document.querySelector('.gui-counter'),
    switch: document.querySelector('.btn-switch'),
    led: document.querySelector('.gui-led'),
    strict: document.querySelector('.btn-strict'),
    start: document.querySelector('.btn-start'),
    pads: document.querySelectorAll('.game-pad')
};

const soundUrl =[
    "audio/simonSound1.mp3",
    "audio/simonSound2.mp3",
    "audio/simonSound3.mp3",
    "audio/simonSound4.mp3"
];

soundUrl.forEach(sndPath => {
    const audio = new Audio(sndPath);
    data.sounds.push(audio);
});

gui.switch.addEventListener("click", () => {
    data.gameOn = gui.switch.classList.toggle('btn-switch-on');

    gui.counter.classList.toggle('gui-counter-on');
    gui.counter.innerHTML = '--';
    
    /* configuração começo do game */ 
    gui.strict = false;
    data.playerCanPlay = false;
    data.score = 0;
    data.gameSequece = [];
    data.playerSequece = [];

    disablePads();
    changePadCursor("auto");

    gui.led.classList.remove("gui-led-active");
});

gui.strict.addEventListener("click", () => {
    if(!data.gameOn){
        return;
    }
    data.strict = gui.led.classList.toggle('gui-led-active');

});

const disablePads = () => {
    gui.pads.forEach(pad => {
        pad.classList.remove("pad-active");
    });
};

gui.start.addEventListener("click", () => {
    startGame();
});

const startGame = () => {
    blink("--", () => {
        newColor();
        playSequence();
        
    });
};

const blink = (text, callblack) => {
    let counter = 0,
        on = true;

    gui.counter.innerHTML = text;

    const interval = setInterval(() => {
        if(!data.gameOn){
            clearInterval(interval);
            gui.counter.classList.remove("gui-counter-on");
        }
        if(on){
            gui.counter.classList.remove("gui-counter-on");
        }else{
            gui.counter.classList.add("gui-counter-on");
            if(++counter === 3){
                clearInterval(interval);
                if(callblack){
                    callblack();
                };
            };              
        };
        on = !on;
    },250);
};

const newColor = () => {
    if(data.score === 2){
        blink("WIN", () => {               
            disablePads();
            data.score = 0;
            data.gameSequece = [];
            startGame();
        });
        return;
    }
    data.gameSequece.push(Math.floor(Math.random() * 4));
    data.score++;

    setScore();
};

const playSequence = () => {
    let counter = 0;
    let padOn = true;

    data.playerSequece = [];
    data.playerCanPlay = false;

    changePadCursor("auto");
    const interval = setInterval(() => {

        if(!data.gameOn){
            clearInterval(interval);
            disablePads();
            return;
        }

        if(padOn){
            
            if(counter === data.gameSequece.length){
                clearInterval(interval);
                disablePads();
                waitForPlayerClick();
                changePadCursor("pointer");
                data.playerCanPlay = true;
                return;
            }

            const snId = data.gameSequece[counter];
            const pad = gui.pads[snId];

            data.sounds[snId].play();
            pad.classList.add("pad-active");
            counter++;
        }
        else{
            disablePads();
        }
        padOn = !padOn;
    }, 750);

};

const setScore = () => {
    const score = data.score.toString();
    const display = "00".substring(0,2 - score.length) + score;
    gui.counter.innerHTML = display;
};

const waitForPlayerClick = () => {
    clearTimeout(data.timeOut);

    data.timeOut = setTimeout(() => {
        if(!data.playerCanPlay){
            return;
        }
        disablePads();
        resetOrPLayAgain();
    }, 5000);
};

const padListener= (e) => {
    if(!data.playerCanPlay){
        return;
    }
    let soundId;
    gui.pads.forEach((pad, key) => {
        if(pad === e.target){
            soundId = key;
        }
    });
    e.target.classList.add("pad-active");
    
    data.sounds[soundId].play();
    data.playerSequece.push(soundId);

    setTimeout(() => {
        e.target.classList.remove("pad-active");

        const currentMove = data.playerSequece.length - 1;

        if(data.playerSequece[currentMove] !== data.gameSequece[currentMove]){
            data.playerCanPlay = false;
            disablePads();
            resetOrPLayAgain();
        }
        else if(currentMove === data.gameSequece.length - 1){
            newColor();
            playSequence();
        }
    }, 250);    
}

gui.pads.forEach(pad => {
    pad.addEventListener("click", padListener);
});

const resetOrPLayAgain = () => {
    data.playerCanPlay = false;
    disablePads();

    if(data.strict){
        blink("!!", () => {
            data.score = 0;
            data.gameSequece = [];
            startGame();
        });
    }
    else{
        blink("!!", () => {
            setScore();
            playSequence();
        });
    }
};

const changePadCursor = (cursorType) => {
    gui.pads.forEach(pad => {
        pad.style.cursor = cursorType;
    })
}