const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let hud = document.querySelector('#hud');
let gameplay = document.querySelector('#gameplay')
let position = 0;
let isJumping = false;
let points = 0;
let gameOver = false;


function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping && !gameOver) {
            jump();
        }
        if (gameOver) {
            restart();
        }
    }
}

function jump() {
    if (gameOver) return;
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);

        } else {
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

if (document.querySelectorAll('cactus').length > 0) {
    background.removeChild(cactus);
}

function createCactus() {
    if (gameOver) {
        return;
    }

    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randonTime = Math.random() * (5000 - 8000) + 5000;

    hud.innerHTML = `<p>Total de Pontos: ${points}</p>`;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px'
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60 || gameOver) {
            clearInterval(leftInterval);
            cactus.remove()
            background.removeChild(cactus);
            if (gameOver === false) points += 50;
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftInterval);

            cactus.remove()
            hud.innerHTML = `
                <p>Total de Pontos: ${points}</p>
                <h1 classe="game-over">Fim de Jogo</h1>
                <button onclick="{restart()}">Restart</button>`;
            gameOver = true;
        } else if (gameOver === false) {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
            if (gameOver === false) points += 1;
        }

    }, 20);
    setTimeout(createCactus, randonTime);
}

function restart() {
    if (gameOver) {
        points = 0;
        hud.innerHTML = `<p>Total de Pontos: ${points}</p>`;
        gameOver = false;
        gameplay.appendChild(background);
        createCactus();

    }
}

createCactus();
document.addEventListener('keypress', handleKeyUp)