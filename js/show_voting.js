"use strict";

function showVotes(data) {
  let all_votes = 0;
  for (let i = 0; i < data.option_votes.length; i++) all_votes += parseInt(data.option_votes[i]);

  const total_votes = document.getElementById("all-votes");
  total_votes.innerHTML = `liczba głosujących: ${data.ip_list.split(";").length - 1}, liczba głosów: ${all_votes}`;

  const options = document.getElementById("options");
  options.innerHTML = "";

  for (let i = 0; i < data.option_votes.length; i++) {
    const how_many_votes = parseInt(data.option_votes[i]);
    let percent = ((how_many_votes / all_votes) * 100).toFixed(2);
    if (all_votes === 0) percent = 0;

    const backround = document.createElement("div");
    backround.setAttribute("class", "background");
    backround.style.width = `${percent}%`;

    const votes_number = document.createElement("div");
    votes_number.setAttribute("class", "votes-number");
    votes_number.innerHTML = `${how_many_votes} (${percent})%`;

    const option = document.createElement("div");
    option.setAttribute("class", localStorage.getItem("theme") === "dark" ? "percent percent-dark" : "percent");
    option.innerHTML = data.option_names[i];
    option.appendChild(backround);
    option.appendChild(votes_number);

    options.appendChild(option);
  }

  const vote = document.getElementById("vote");

  vote.classList.replace("green", "red");
  vote.innerHTML = '<i class="fas fa-times"></i> Cofnij głos';
}

function fillVoting(data) {
  const question = document.getElementById("question");
  const type = document.getElementById("type");
  const description = document.getElementById("description");
  const voting_term = document.getElementById("voting-term");
  const options = document.getElementById("options");

  let term = "";
  if (data.date === "") term = "brak terminu";
  else {
    const date = timestampToStrings(parseInt(data.date));
    term = `${date.day}-${date.month}-${date.year} ${date.hours}:${date.minutes}`;
    if (Date.now() >= parseInt(data.date)) term = `<span style="color:red">${term}</span>`;
  }

  question.innerHTML = decodeURIComponent(data.question);
  type.innerHTML = data.private ? "prywatne" : "publiczne";
  description.innerHTML = decodeURIComponent(data.description);
  voting_term.innerHTML = `Głosowanie ważne do: ${term}`;

  const many_options = data.many_options === "0";
  const isDarkThemeOn = localStorage.getItem("theme") === "dark";

  for (let i = 0; i < data.option_votes.length; i++) {
    const option_checkbox = document.createElement("input");
    option_checkbox.setAttribute("type", many_options ? "radio" : "checkbox");
    option_checkbox.setAttribute("name", many_options ? "radio" : `checkbox${i}`);
    option_checkbox.setAttribute("id", `option${i}`);

    const option_text = document.createElement("label");
    option_text.setAttribute("for", `option${i}`);
    option_text.innerHTML = data.option_names[i];

    const option = document.createElement("div");
    option.setAttribute("class", isDarkThemeOn ? "voting-option option-dark" : "voting-option");
    option.addEventListener("click", () => option_text.click());
    option.appendChild(option_checkbox);
    option.appendChild(option_text);

    options.appendChild(option);
  }

  const total_votes = document.getElementById("all-votes");
  total_votes.innerHTML = "";
}

async function showVoting(file_name, passwd, priv) {
  fetch(path + "/php/open_voting.php", fetchParams({ file_name: file_name, passwd: passwd }))
    .then((response) => response.json())
    .then((data) => {
      data.private = priv;

      copyTemplate("voting-template");

      const copy_link = document.getElementById("copy-link");
      const after_copy = () => {
        copy_link.innerHTML = "Skopiowano!";
        setTimeout(() => (copy_link.innerHTML = "Skopiuj link"), 2000);
      };
      copyLinkListener(copy_link, file_name, after_copy);

      addObserveListener(data.question, file_name);

      if (data.deleted === "1") {
        const delete_button = document.getElementById("delete");
        delete_button.innerHTML = '<i class="fas fa-trash-restore-alt"></i> Przywróć';

        const edit = document.getElementById("edit");
        edit.style.display = "none";

        const vote = document.getElementById("vote");
        vote.style.display = "none";

        const question = document.getElementById("question");
        question.style.color = "red";
        question.innerHTML = "To głosowanie zostało dodane do usunięcia i zniknie w najbliższym czasie";

        addRestoreListener(data);
      } else {
        addEditListener(data, passwd);
        addDeleteListener(data);
        fillVoting(data);

        if (parseInt(data.date) < Date.now()) {
          showVotes(data);
          const vote = document.getElementById("vote");
          vote.style.display = "none";
        } else addVoteListener(data);
      }

      randomHover();
      addArrowsListners(data);

      if (data.ip_list.includes(ip)) showVotes(data);

      console.log(data);
    });
}
