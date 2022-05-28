"use strict";

function initLocalStrorageItem(name = "") {
  if (name === "") return;

  const item = localStorage.getItem(name);
  if (!isDefined(item)) localStorage.setItem(name, "");
}

initLocalStrorageItem("yours");
initLocalStrorageItem("observed");
initLocalStrorageItem("passwords");
initLocalStrorageItem("admin_passwords");
initLocalStrorageItem("votes");

let cooldown = 0;

function setCoolDown() {
  cooldown = 3;
  let interval = setInterval(() => {
    if (cooldown === 0) clearInterval(interval);
    else cooldown--;
  }, 1000);
}

const href = window.location.href.split("?");
const path = href[0];

let ip = "";
fetch(path + "php/get_ip.php").then((response) => response.text()).then((data) => {ip = data})

const logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  copyTemplate("main-page-template");

  const browse_link = document.getElementById("go-to-browse");
  const browse = document.getElementById("browse");
  browse_link.addEventListener("click", () => browse.click());

  const contact_link = document.getElementById("go-to-contact");
  const contact = document.getElementById("contact");
  contact_link.addEventListener("click", () => contact.click());

  const help_link = document.getElementById("go-to-help");
  const help = document.getElementById("help");
  help_link.addEventListener("click", () => help.click());
  randomHover();
});

logo.click();
