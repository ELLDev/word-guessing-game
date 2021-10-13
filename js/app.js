const overlay = document.querySelector("#overlay");
const qwerty = document.querySelector("#qwerty");
const qwertyButtons = document.querySelectorAll("button");
const phrase = document.querySelector("#phrase ul");
const button = document.querySelector(".btn__reset");
const scoreboard = document.querySelectorAll("#scoreboard img");
const phrases = [
  "Cheesed to meet you",
  "I like green apples",
  "So yummy for a tummy",
  "I love rats",
  "Discipline equals freedom",
];
let recentPhrases = new Array(Math.round((phrases.length * 2) / 3)).fill(-1);
let randomPhraseIndex = -1;
let missed = 0;
let gameOver = false;

button.addEventListener("click", () => {
  overlay.style.display = "none";
});

qwerty.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.className += " chosen";
    e.target.disabled = true;
    const letterFound = checkLetter(e.target.textContent);
    if (!letterFound) {
      missed += 1;
      scoreboard[scoreboard.length - missed].src = "images/lostHeart.png";
    }
  }

  checkWin();
});

const getRandomPhraseAsArray = () => {
  let arrayOfLetters = [];
  let sentence = "";

  while (recentPhrases.includes(randomPhraseIndex)) {
    randomPhraseIndex = Math.floor(Math.random() * phrases.length);
  }
  recentPhrases.pop();
  recentPhrases.unshift(randomPhraseIndex);
  sentence = phrases[randomPhraseIndex];

  for (let i = 0; i < sentence.length; i++) {
    arrayOfLetters.push(sentence[i]);
  }

  return arrayOfLetters;
};

const addPhraseToDisplay = () => {
  const splitPhrase = getRandomPhraseAsArray();

  for (let i = 0; i < splitPhrase.length; i++) {
    const li = document.createElement("li");
    li.textContent = splitPhrase[i];
    if (splitPhrase[i] === " ") {
      li.className = "space";
    } else {
      li.className = "letter";
    }
    phrase.append(li);
  }
};

const checkLetter = (letter) => {
  const letters = document.querySelectorAll(".letter");
  let letterFound = false;

  for (let i = 0; i < letters.length; i++) {
    if (letter === letters[i].textContent.toLowerCase()) {
      letters[i].className += " show";
      letterFound = true;
    }
  }

  return letterFound;
};

const checkWin = () => {
  const numOfLetters = document.querySelectorAll("li.letter");
  const numOfLettersFound = document.querySelectorAll("li.show");
  const title = document.querySelector("h2.title");

  if (numOfLetters.length === numOfLettersFound.length) {
    gameOver = true;
    title.textContent = "Success";
    overlay.style.display = "";
    overlay.className = "win";
  }

  if (missed === 5) {
    gameOver = true;
    title.textContent = "Failure";
    overlay.style.display = "";
    overlay.className = "lose";
  }

  if (gameOver) {
    gameOver = false;
    button.textContent = "Restart Game";
    missed = 0;
    phrase.innerHTML = "";
    addPhraseToDisplay();

    for (let i = 0; i < qwertyButtons.length; i++) {
      qwertyButtons[i].className = "";
      qwertyButtons[i].disabled = false;
    }
    for (let i = 0; i < scoreboard.length; i++) {
      scoreboard[i].src = "images/liveHeart.png";
    }
  }
};

addPhraseToDisplay();
