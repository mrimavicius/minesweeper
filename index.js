"use strict";
const game = document.querySelector(".game");
const score = document.querySelector(".score");
const playAgain = document.querySelector(".playAgain");
let counter = 0;
appendSquares();
const squares = document.querySelectorAll(".square");
startGame();
function appendSquares() {
    const random = () => Math.floor(Math.random() * 100 + 1);
    for (let i = 0; i < 100; i++) {
        let bomb = random() > 10 ? "" : "bomb";
        // console.log(bomb)
        game.innerHTML +=
            `
        <div class="square ${bomb}"></div>
        `;
    }
}
function startGame() {
    squares.forEach(x => {
        x.style.background = "";
        x.onclick = function (e) {
            const target = e.target;
            if (target.className.includes("bomb")) {
                x.style.background = "red";
                alert(`Game over! Your score is ${counter}`);
                stopGame();
            }
            if (!target.className.includes("bomb")) {
                x.style.background = "green";
                counter++;
                updatePoints();
            }
        };
    });
}
function updatePoints() {
    score.innerHTML =
        `
    POINTS: ${counter}
    `;
}
function stopGame() {
    squares.forEach(x => {
        x.onclick = null;
    });
}
playAgain.onclick = function () {
    startGame();
    counter = 0;
    updatePoints();
};
