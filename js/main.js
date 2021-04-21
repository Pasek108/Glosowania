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

async function getAdressIp() {
  let cloudflare_trace = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
  cloudflare_trace = cloudflare_trace.text();

  const ip = cloudflare_trace.then((text) => {
    text = text.split("\n");
    return text[2].slice(3, text[2].length);
  });

  return ip;
}

let ip = "";
getAdressIp().then((value) => (ip = value));

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

const logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  copyTemplate("main-page-template");
  const browse_link = document.getElementById("go-to-browse");
  const browse = document.getElementById("browse");
  browse_link.addEventListener("click", () => browse.click());
  randomHover();
});

logo.click();
