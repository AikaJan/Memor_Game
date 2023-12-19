const gameContainer = document.getElementById("game");
const restartButton = document.getElementById("restartButton");
const clickCounter = document.getElementById("clickCount");

let clickCount = 0;
let firstCard = null;
let secondCard = null;
let turnedCard = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


function handleCardClick(event) {
  let clickedCard = event.target;

  if (!firstCard || !secondCard) {
    clickCount++;
    clickCounter.textContent = clickCount;

    if (clickCount > 20) {
      alert("Game over! Too many clicks.");
      location.reload();
    }

    if (!clickedCard.classList.contains('turned')) {
      clickedCard.classList.add('turned');
      clickedCard.style.backgroundColor = clickedCard.className;

      if (!firstCard) {
        firstCard = clickedCard;
      } else {
        secondCard = clickedCard;

        if (firstCard.className === secondCard.className) {
          firstCard.removeEventListener('click', handleCardClick);
          secondCard.removeEventListener('click', handleCardClick);
          firstCard = null;
          secondCard = null;
          turnedCard += 2;

          if (turnedCard === COLORS.length) {
            setTimeout(() => {
              alert("Game over!");
              location.reload();
            }, 500);
          }
        } else {
          setTimeout(() => {
            firstCard.style.backgroundColor = '';
            secondCard.style.backgroundColor = '';
            firstCard.classList.remove('turned');
            secondCard.classList.remove('turned');
            firstCard = null;
            secondCard = null;
          }, 1000);
        }
      }
    }
  }
}
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.classList.add(color);

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}


restartButton.addEventListener("click", function() {
  location.reload();
});

createDivsForColors(shuffledColors);


