"use strict";

function addDropdownListeners() {
  const dropdown = document.getElementById("dropdown");
  const menu_options = document.getElementById("menu-options");
  const dropdown_icon = document.getElementById("dropdown-icon");

  dropdown.addEventListener("click", () => {
    if (menu_options.style.display === "block") menu_options.style.display = "none";
    else menu_options.style.display = "block";
  });

  window.addEventListener("click", (e) => {
    if (e.target != dropdown && e.target != dropdown_icon) {
      if (menu_options.style.display === "block") menu_options.style.display = "none";
    }
  });
}

addDropdownListeners();
