document.addEventListener("DOMContentLoaded", () => {
    createGame();

    function createGame() {
        const board = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add('square');
            square.setAttribute("id", index + 1);
            board.appendChild(square);
        }
    }
});


let guessedWords = [[]];
let guessedWordsCount = 0;
let guessed = false;

let availableSpace = 1;
const keys = document.querySelectorAll(".keyboard-row button");

const errorMessage = document.getElementById("game-error-msg");
const winMessage = document.getElementById("game-win-msg");

const interval = 200;

const word = "ocean"; // temporary


for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
        const letter = target.getAttribute("data-key");
        errorMessage.textContent = "";

        if (letter === "del") {
            delLetter();
            return;
        }

        if (letter === "enter") {
            submitWord();
            return;
        }

        updateGuessedWords(letter);
    }
}

function getCurrentWordArr() {
    const numGuessedWords = guessedWords.length;
    return guessedWords[numGuessedWords - 1];
}


function updateGuessedWords(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < 5) {
        currentWordArr.push(letter);

        const availableSpaceElement = document.getElementById(String(availableSpace));
        availableSpace = availableSpace + 1;

        availableSpaceElement.textContent = letter;
    }
}

function checkCurrentWordIndex(i) {
    switch (guessedWordsCount) {
        case 1:
            j = i + 5;
            return j;
        case 2:
            j = i + 10;
            return j;
        case 3:
            j = i + 15;
            return j;
        case 4:
            j = i + 20;
            return j;
        case 5:
            j = i + 25;
            return j;
        default:
            j = i;
            return j;
    }
}


function submitWord() {
    if (guessedWordsCount < 6) {
        if (guessed === true) {
            winMessage.textContent = "Well done! You guessed correctly.";
            errorMessage.textContent = "";
        }
        let currentWordArr = getCurrentWordArr();

        if (currentWordArr.length !== 5) {
            errorMessage.textContent = "Word must be 5 letters.";
        }
        else {

            let currentWord = currentWordArr.join('');

            if (guessedWords.length > 5) {
                errorMessage.textContent = "Sorry, you've used up all your guesses.";
            }

            if (currentWord === word) {
                guessed = true;
                availableSpace = availableSpace - 1
                for (let i = 0; i < word.length; i++) {
                    j = availableSpace = availableSpace-1;

                    correctSquares = document.getElementById(String(j+1));
                    correctSquares.classList.add('square-correct');
                }
                winMessage.textContent = "Well done! You guessed correctly.";
            }
            else {
                for (let i = 0; i < word.length; i++) {
                    if (currentWord[i] === word[i]) {
                        let j = checkCurrentWordIndex(i)

                        correctSquares = document.getElementById(String(j+1));
                        correctSquares.classList.add('square-correct');
                    }
                    else if (!word.includes(currentWord[i])) {
                    }
                    else {
                        let j = checkCurrentWordIndex(i)
                        misplacedSquares = document.getElementById(String(j+1));
                        misplacedSquares.classList.add('square-misplaced');
                    }
                }
            }
            guessedWords.push([]);
            guessedWordsCount++;
        }
    }
    else if (guessed === true) {
        winMessage.textContent = "Well done! You guessed correctly.";
        errorMessage.textContent = "";
    }
    else {
        errorMessage.textContent = "Sorry, you've used up all your guesses.";
    }
}


function delLetter() {
    const currentWord = getCurrentWordArr();

    const availableSpaceElement = document.getElementById(String(availableSpace - 1));
    availableSpaceElement.textContent = "";
    availableSpace = availableSpace - 1;

    currentWord.pop()
}
