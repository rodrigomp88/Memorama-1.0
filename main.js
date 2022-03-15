//initial vars
let uncoverCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let hits = 0;
let timer = false;
let time = 30;
let initialTimer = time;
let timeRemaining = null;

//to HTML
let showMovements = document.getElementById("movements");
let showHits = document.getElementById("hits");
let showTime = document.getElementById("timeRemaining");

//random number
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => {
  return Math.random() - 0.5;
});
console.log(numbers);

//functions
function resetGame() {
  location.reload();
}

function counterTime() {
  timeRemaining = setInterval(() => {
    time--;
    showTime.innerHTML = `Time: ${time} seconds`;
    if (time == 0) {
      clearInterval(timeRemaining);
      blockCard();
    }
  }, 1000);
}

function blockCard() {
  for (let i = 0; i <= 15; i++) {
    let cardBlock = document.getElementById(i);
    cardBlock.innerHTML = numbers[i];
    cardBlock.disabled = true;
  }
}

function uncover(id) {
  if (timer == false) {
    counterTime();
    timer = true;
  }

  uncoverCards++;
  console.log(uncoverCards);

  if (uncoverCards == 1) {
    //show first number
    card1 = document.getElementById(id);
    firstResult = numbers[id];
    card1.innerHTML = numbers[id];

    //disabled first button
    card1.disabled = true;
  } else if (uncoverCards == 2) {
    //show second number
    card2 = document.getElementById(id);
    secondResult = numbers[id];
    card2.innerHTML = numbers[id];

    //disabled second button
    card2.disabled = true;

    //increase movements
    movements++;
    showMovements.innerHTML = `Movements: ${movements}`;

    if (firstResult == secondResult) {
      //close uncover card counter
      uncoverCards = 0;

      //increase hits
      hits++;
      showHits.innerHTML = `Hits: ${hits}`;

      if (hits == 8) {
        clearInterval(timeRemaining);
        showHits.innerHTML = `Hits: ${hits} 😱`;
        showTime.innerHTML = `Great! your score is ${
          initialTimer - time
        } seconds`;
        showMovements.innerHTML = `Movements: ${movements} 😎`;
      }
    } else {
      //show values and uncovered
      setTimeout(() => {
        card1.innerHTML = "";
        card2.innerHTML = "";
        card1.disabled = false;
        card2.disabled = false;
        uncoverCards = 0;
      }, 800);
    }
  }
}
