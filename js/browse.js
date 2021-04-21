"use strict";

const browse = document.getElementById("browse");

browse.addEventListener("click", () => {
  copyTemplate("browse-template");

  const search = document.getElementById("search");
  const searched_votings = document.getElementById("searched-votings");
  const show_search_results = (data) => {
    for (let i = 0; i < data.name.length; i++) {
      const voting_link = document.createElement("div");
      voting_link.setAttribute("class", "voting-link");

      const header = document.createElement("h3");
      header.innerHTML = decodeURIComponent(data.question[i]);

      const description = document.createElement("p");
      description.innerHTML = decodeURIComponent(data.description[i]);

      voting_link.appendChild(header);
      voting_link.appendChild(description);
      voting_link.addEventListener("click", (evt) => openVoting(data.name[i]));

      searched_votings.appendChild(voting_link);
    }

    if (data.name.length === 20) {
      const load_more = document.createElement("p");
      load_more.setAttribute("class", "load-more");
      load_more.innerHTML = "załaduj więcej...";
      load_more.addEventListener("click", (evt) => {
        fetch(path + "php/get_public_votings.php", fetchParams({ search: "", id: data.id + 1 }))
          .then((response) => response.json())
          .then((data) => {
            load_more.remove();
            if (data.name.length === 0) {
              const nothing_found = document.createElement("p");
              nothing_found.style.textAlign = "center";
              nothing_found.innerHTML = "Niczego nie znaleziono :(";
              searched_votings.appendChild(nothing_found);
            } else show_search_results(data);
          });
      });

      searched_votings.appendChild(load_more);
    }
  };

  const searchForVotings = (evt) => {
    fetch(path + "php/get_public_votings.php", fetchParams({ search: search.value.trim().toLowerCase(), id: 1 }))
      .then((response) => response.json())
      .then((data) => {
        searched_votings.innerHTML = "";
        if (data.name.length === 0) searched_votings.innerHTML = "Niczego nie znaleziono :(";
        else show_search_results(data);
      });
  };
  const search_form = document.getElementsByClassName("search")[0];
  search_form.addEventListener("submit", (evt) => evtWithCoolDown(evt, searchForVotings));

  fetch(path + "php/get_public_votings.php", fetchParams({ search: "", id: 1 }))
    .then((response) => response.json())
    .then((data) => {
      searched_votings.innerHTML = "";
      if (data.name.length === 0) searched_votings.innerHTML = "Niczego nie znaleziono :(";
      else show_search_results(data);
    });
});
