"use strict";

function addObserveListener(question, voting_name) {
  question = decodeURIComponent(question);

  const observe = document.getElementById("observe");
  let observed_votings = localStorage.getItem("observed");

  const setButtonActive = () => {
    observe.setAttribute("class", "button button-always orange");
    observe.innerHTML = observe.innerHTML.replace("Obserwuj", "Obserwujesz");
    switchIcon(document.getElementById("observe-icon"));
  };

  const setButtonUnactive = () => {
    observe.setAttribute("class", "button button--ujarak button_orange");
    observe.innerHTML = observe.innerHTML.replace("Obserwujesz", "Obserwuj");
    switchIcon(document.getElementById("observe-icon"));
  };

  if (observed_votings.includes(voting_name)) setButtonActive();

  observe.addEventListener("click", () => {
    if (observed_votings.includes(voting_name)) {
      observed_votings = observed_votings.replace(`;${question}-${voting_name}`, "");
      setButtonUnactive();
      throwMessage("succes", "Usunięto z obserwowanych");
    } else {
      observed_votings += `;${question}-${voting_name}`;
      setButtonActive();
      throwMessage("succes", "Dodano do obserwowanych");
    }

    localStorage.setItem("observed", observed_votings);

    loadVotingLinks("yours");
    loadVotingLinks("observed");
  });
}
