const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
let score = 0

const sound = new Audio("assets/NomNomNom.mp3")

var backgroundMusic = new Audio("assets/Jungle Area - Welcome to the jungle.mp3");
backgroundMusic.autoplay = true;
backgroundMusic.loop = true;
var isMusicOn = false;

function playBGM() {
    if(isMusicOn){
        document.getElementById("changeImg").src = "assets/musicOff.png";
        backgroundMusic.pause();
    }
    else{
        document.getElementById("changeImg").src = "assets/musicOn.png";
        backgroundMusic.play();
    }
    isMusicOn = !isMusicOn;
}

function run(){
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let timer = null

    const img = document.createElement('img')
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
run()

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