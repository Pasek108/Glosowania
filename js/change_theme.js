"use strict";

const header = document.getElementById("header");
const light_mode = document.getElementById("light-mode");
const dark_mode = document.getElementById("dark-mode");
const slider = document.getElementById("theme-slider");
const dot = document.getElementById("dot");
const main = document.getElementById("main");
const footer = document.getElementById("footer");

const setTheme = (theme) => localStorage.setItem("theme", theme);

const isSliderOff = () => {
  return slider.classList.contains("slider-on");
};

const turnOnLightMode = () => {
  if (isSliderOff()) {
    removeClassFromElem("header-dark", header);
    removeClassFromElem("slider-on", slider);
    removeClassFromElem("main-dark", main);
    removeClassFromElem("footer-dark", footer);
    dot.style.marginLeft = "-1px";

    const options = document.getElementsByClassName("voting-option");
    for (let i = 0; i < options.length; i++) removeClassFromElem("option-dark", options[i]);

    const percents = document.getElementsByClassName("percent");
    for (let i = 0; i < percents.length; i++) removeClassFromElem("percent-dark", percents[i]);

    setTheme("light");
  }
};

const turnOnDarkMode = () => {
  if (!isSliderOff()) {
    addClassToElem("header-dark", header);
    addClassToElem("slider-on", slider);
    addClassToElem("main-dark", main);
    addClassToElem("footer-dark", footer);

    const options = document.getElementsByClassName("voting-option");
    for (let i = 0; i < options.length; i++) addClassToElem("option-dark", options[i]);

    const percents = document.getElementsByClassName("percent");
    for (let i = 0; i < percents.length; i++) addClassToElem("percent-dark", percents[i]);

    dot.style.marginLeft = "1.15rem";
    setTheme("dark");
  }
};

/*---------- Theme on start ----------*/

const theme = localStorage.getItem("theme");

switch (theme) {
  case "light":
    turnOnLightMode();
    break;

  case "dark":
    turnOnDarkMode();
    break;

  default:
    localStorage.setItem("theme", "light");
}

/*---------- Change of theme ----------*/

slider.addEventListener("click", () => {
  let theme = localStorage.getItem("theme");

  switch (theme) {
    case "light":
      turnOnDarkMode();
      break;

    default:
      turnOnLightMode();
  }
});

light_mode.addEventListener("click", turnOnLightMode);
dark_mode.addEventListener("click", turnOnDarkMode);
