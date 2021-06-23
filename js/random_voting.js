"use strict";

async function getRandomVoting() {
  fetch(path + "php/random_voting.php", fetchParams())
    .then((response) => response.text())
    .then((res) => openVoting(res));
}

function randomHover() {
  const cubeNumbersClass = ["fa-dice-one", "fa-dice-two", "fa-dice-three", "fa-dice-four", "fa-dice-five", "fa-dice-six"];
  let number = 0;
  let interval;

  const cube = document.getElementById("cube");

  const changeCube = () => {
    removeClassFromElem(cubeNumbersClass[number], cube);
    if (number === 5) number = 0;
    else number++;
    addClassToElem(cubeNumbersClass[number], cube);
  };

  const random = document.getElementById("random");
  random.addEventListener("mouseover", () => (interval = setInterval(changeCube, 500)));
  random.addEventListener("mouseout", () => clearInterval(interval));
  random.addEventListener("click", (evt) => {
    evt.preventDefault();
    evtWithCoolDown(evt, getRandomVoting);
  });
}
