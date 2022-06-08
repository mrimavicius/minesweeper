const game = document.querySelector(".game") as HTMLElement
const score = document.querySelector(".score") as HTMLElement
const playAgain = document.querySelector(".playAgain") as HTMLButtonElement

let counter: number = 0


appendSquares()

const squares = document.querySelectorAll(".square") as NodeListOf<HTMLElement>

startGame()

function appendSquares(): void {

    const random = () => Math.floor(Math.random() * 100 + 1)

    for (let i = 0; i < 100; i++) {

        let bomb = random() > 10 ? "" : "bomb"
        // console.log(bomb)
        game.innerHTML +=
            `
        <div class="square ${bomb}"></div>
        `
    }

}

function startGame(): void {

    squares.forEach(x => {

        x.style.background = ""

        x.onclick = function (e): void {

            const target = e.target as HTMLButtonElement

            if (target.className.includes("bomb")) {
                x.style.background = "red"
                alert(`Game over! Your score is ${counter}`)
                stopGame()
            }

            if (!target.className.includes("bomb")) {
                x.style.background = "green"
                counter++
                updatePoints()
            }
        }
    })
}

function updatePoints(): void {
    score.innerHTML =
        `
    POINTS: ${counter}
    `
}

function stopGame(): void {
    squares.forEach(x => {
        x.onclick = null
    })
}

playAgain.onclick = function () {
    startGame()

    counter = 0

    updatePoints()
}