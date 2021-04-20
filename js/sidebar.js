"use strict";

function addOpenMenuListener() {
  const menu = document.getElementById("menu");
  const open_menu = document.getElementById("open_menu");

  open_menu.addEventListener("click", () => {
    switch (menu.style.left) {
      case "0px":
        menu.style.left = "-17.05rem";
        break;

      default:
        menu.style.left = "0px";
    }
  });
}

function addEmpty(container) {
  const epmty = document.createElement("div");
  epmty.setAttribute("class", "empty");
  epmty.innerHTML = "Brak";
  container.appendChild(epmty);
}

function loadVotingLinks(name = "") {
  const container = document.getElementById(name);
  container.innerHTML = "";

  const items = getLocalStorageItem(name).map((key) => key.split("-"));

  if (items.length === 1) addEmpty(container);
  else {
    for (let i = 1; i < items.length; i++) {
      const question = items[i][0];
      const voting_name = items[i][1];

      const template = document.getElementById("menu-item-template");
      const voting = template.content.firstElementChild.cloneNode(true);

      const voting_link = voting.children[0];
      voting_link.setAttribute("title", question);
      voting_link.addEventListener("click", () => {
        open_menu.click();
        openVoting(voting_name);
      });
      voting_link.innerHTML = question;

      const copy_icon = voting.children[1];
      copy_icon.addEventListener("click", () => {
        const after_copy = () => {
          copy_icon.innerHTML = '<i class="fas fa-copy"></i>';
          setTimeout(() => (copy_icon.innerHTML = '<i class="far fa-copy"></i>'), 2000);
        };

        copyLinkListener(copy_icon, voting_name, after_copy);
      });

      container.appendChild(voting);
    }
  }
}

loadVotingLinks("yours");
loadVotingLinks("observed");
addOpenMenuListener();
