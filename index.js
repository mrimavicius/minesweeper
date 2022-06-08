"use strict";
const game = document.querySelector(".game");
const score = document.querySelector(".score");
const playAgain = document.querySelector(".playAgain");
let counter = 0;
let gameOver = false;
function appendSquares() {
    playAgain.style.display = "none";
    gameOver = false;
    game.innerHTML = "";
    counter = 0;
    score.innerHTML = `
        POINTS: ${counter}
        `;
    const random = () => Math.floor(Math.random() * 100 + 1);
    for (let i = 0; i < 80; i++) {
        let bomb = random() > 8 ? "" : "bomb";
        game.innerHTML += `
        <div class="square ${bomb}" id="${i}"></div>
        `;
    }
    const squares = document.querySelectorAll(".square");
    squares.forEach(x => x.onclick = startGame);
}
function startGame(e) {
    if (gameOver)
        return;
    const target = e.target;
    if (target.className.includes("bomb")) {
        target.style.background = "#D83A56";
        target.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
        score.innerHTML = `
                GAME OVER! Your score: ${counter}
                `;
        gameOver = true;
        playAgain.style.display = "block";
        return showBombs(target.id);
    }
    else {
        if (target.className.includes("defused"))
            return;
        counter++;
        score.innerHTML = `
        POINTS: ${counter}
        `;
        target.classList.add("defused");
        target.style.background = "#66DE93";
    }
}
function showBombs(id) {
    const squares = document.querySelectorAll(".square");
    squares.forEach((x, i) => {
        if (x.className.includes("bomb") && i !== Number(id)) {
            x.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
        }
    });
}
playAgain.onclick = appendSquares;
appendSquares();
