let boxes = document.querySelectorAll(".game-box");
let restartButton = document.querySelector("#restart-game");
let newGameButton = document.querySelector("#new-game-btn");
let messageContainer = document.querySelector(".message-container");
let gameMessage = document.querySelector("#game-message");

let count = 0; // to know if the match is draw
let turn0 = true; // player x ,player o
const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turn0) {
                box.innerText = "O";
                turn0 = false;
            } else {
                box.innerText = "X";
                turn0 = true;
            }
            box.disabled = true;
            count++;

            console.log(`Box ${index} clicked, value: ${box.innerText}`);
            let iswinner = checkWinner();
            if (count === 9 && !iswinner) {
                gameDraw();
            }
        }
    });
});

const gameDraw = () => {
    gameMessage.innerText = `Game Draw!`;
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    gameMessage.innerText = `Congratulations, Winner is ${winner}`;
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    messageContainer.classList.add("hide");
};

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true;
            }
        }
    }
    return false;
};

newGameButton.addEventListener("click", resetGame);
restartButton.addEventListener("click", resetGame);