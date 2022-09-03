const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
let score = 0

const sound = new Audio("assets/NomNomNom.mp3");
const backgroundMusic = new Audio("assets/WelcomeToTheJungle.mp3");
backgroundMusic.autoplay = true;
backgroundMusic.loop = true;

var isMusicOn = false;
var gamePaused = false;

function playBGM() {
    if(isMusicOn){
        document.getElementById("musicBtn").src = "assets/musicOff.png";
        backgroundMusic.pause();
    }
    else{
        document.getElementById("musicBtn").src = "assets/musicOn.png";
        backgroundMusic.play();
    }
    isMusicOn = !isMusicOn;
}

function run(){
    if(!gamePaused){
        const i = Math.floor(Math.random() * holes.length)
        const hole = holes[i]
        let timer = null

        const img = document.createElement('img');
        img.classList.add('Hopper')
        img.src = 'assets/Hopper.png'

        img.addEventListener('click', () => {
            score += 10
            sound.play()
            scoreEl.textContent = score
            img.src = 'assets/Hopper-fed.png'
            clearTimeout(timer)
            setTimeout(() => {
                hole.removeChild(img)
                run()
            }, 500)
        })

        hole.appendChild(img)

        timer = setTimeout(() => {
            hole.removeChild(img)
            run()
        }, 1500)
    }
}
run()

function resumeGame(){
    document.getElementById("modal").style.visibility = 'hidden';
    document.getElementById("pauseBtn").src = "assets/pause.png";
    clearTimeout();
    run();
}

function pauseGame(){
    gamePaused = !gamePaused;
    
    if(!gamePaused){
        resumeGame();
    }
    else{
        clearTimeout();

        document.getElementById("modal").style.visibility = 'visible';
        document.getElementById("pauseBtn").src = "assets/play.png";

        modal.addEventListener('click', function handler(event) {
            this.removeEventListener("click", handler);
            gamePaused = false;
            resumeGame();
        });
    }
}

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})