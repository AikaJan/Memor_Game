
const gameContainer = document.getElementById("game");

// states

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

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more

function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add('card');
    newDiv.classList.add(color);


    // call a function handleCardClick when a div is clicked on
    // append the div to the element with an id of game

    newDiv.addEventListener("click", function handleCardClick (event) {
      let clickedCard = event.target;

      if(!firstCard || ! secondCard) {
        if(!clickedCard.classList.contains('turned')) {
          clickedCard.classList.add('turned');
          clickedCard.style.backgroundColor = color;
          if (!firstCard) {
            firstCard = clickedCard;
          } else {
            secondCard = clickedCard;

            if(firstCard.className === secondCard.className){
              firstCard.removeEventListener('click', handleCardClick);
              secondCard.removeEventListener('click', handleCardClick);
              firstCard = null;
              secondCard = null;
              turnedCard +=2;
              if(turnedCard === COLORS.length) {
                setTimeout(() => {
                  alert("GAME OVER!");
                  location.reload();
                },500);
              }
            } else {
              setTimeout(() => {
                firstCard.style.backgroundColor = "";
                secondCard.style.backgroundColor = "";
                firstCard.classList.remove('turned');
                secondCard.classList.remove('turned');
                firstCard = null;
                secondCard = null;
              }, 1000);
            }
          }
        }
      }

    });

    
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);
