"use strict";

function addPrivateVotingListener() {
  const priv = document.getElementById("priv");
  const priv_parent_elem = document.getElementsByClassName("priv")[0];

  priv.addEventListener("change", (e) => {
    switch (e.target.checked) {
      case true:
        const passwd_input = document.createElement("input");
        passwd_input.setAttribute("id", "password");
        passwd_input.setAttribute("class", "password");
        passwd_input.setAttribute("placeholder", "Hasło dostępu");
        passwd_input.setAttribute("pattern", "[A-Za-z0-9AaĄąĆćĘęŁłŃńÓóŚśŹźŻż.,?s]{1,20}");
        passwd_input.setAttribute("required", "true");
        priv_parent_elem.appendChild(passwd_input);
        break;

      default:
        priv_parent_elem.removeChild(priv_parent_elem.lastChild);
    }
  });
}

function addNewOptionListener() {
  const add_option = document.getElementById("add-option");
  const options = document.getElementById("options_inputs");

  add_option.addEventListener("click", () => {
    let option_number = document.getElementsByClassName("option-input").length + 1;

    if (option_number > 20) {
      throwMessage("information", "Osiągnięto limit opcji");
      return;
    }

    const option_input = document.createElement("input");
    option_input.setAttribute("class", "option-input");
    option_input.setAttribute("placeholder", `Wybór ${option_number}`);
    option_input.setAttribute("pattern", "[A-Za-z0-9AaĄąĆćĘęŁłŃńÓóŚśŹźŻż.,?s]{0,48}");
    options.appendChild(option_input);
  });
}

function sendVoting(e) {
  e.preventDefault();

  const admin_password = document.getElementById("admin-password").value.trim();

  const date = document.getElementById("date").valueAsNumber;
  const term = !isDefined(date) ? `${new Date(date).getTime() - 7200000}` : "";

  const priv = document.getElementById("priv").checked ? 1 : 0;
  const password = priv ? document.getElementById("password").value.trim() : "";

  const question = document.getElementById("question-input").value.trim();
  const description = document.getElementById("description-input").value.trim();

  const many_options = document.getElementById("many-options").checked ? 1 : 0;

  const options_inputs = document.getElementsByClassName("option-input");
  const options = Array.from(options_inputs).map((elem) => elem.value.trim());

  const send_data = {
    admin_passwd: admin_password,
    term: term,
    priv: priv,
    passwd: password,
    question: encodeURIComponent(question),
    description: encodeURIComponent(description),
    many: many_options,
    options: options,
  };

  fetch(path + "php/create_voting.php", fetchParams(send_data))
    .then((response) => response.json())
    .then((data) => {
      const voting_name = data.name;
      localStorageAddKey("yours", `;${question}-${voting_name}`);
      localStorageAddKey("admin_passwords", `;${voting_name}-${admin_password}`);

      if (password !== "") localStorageAddKey("passwords", `;${voting_name}-${password}`);

      loadVotingLinks("yours");
      loadVotingLinks("observed");

      throwMessage("succes", "Pomyślnie utworzono głosowanie");
      openVoting(voting_name);
    });
}

const create_voting = document.getElementById("create-voting");

create_voting.addEventListener("click", () => {
  copyTemplate("create-voting-template");
  addPrivateVotingListener();
  addNewOptionListener();

  const add_voting = document.getElementById("add-voting");
  add_voting.addEventListener("click", (e) => {});

  const voting_form = document.getElementById("create-voting-form");
  voting_form.addEventListener("submit", (evt) => evtWithCoolDown(evt, sendVoting));
});
