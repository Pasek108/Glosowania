"use strict";

function addVoteListener(data) {
  const vote = document.getElementById("vote");

  vote.addEventListener("click", (e) => {
    e.preventDefault();
    if (cooldown !== 0) {
      throwMessage("information", `Poczekaj ${cooldown}s`);
      return;
    }

    if (vote.innerHTML.includes("Zagłosuj")) {
      let options_checked = [];
      let count_checked = 0;
      let votes = localStorage.getItem("votes");
      votes = `;${data.name}`;

      for (let i = 0; i < data.option_votes.length; i++) {
        const option_value = document.getElementById(`option${i}`).checked;
        options_checked.push(option_value);
        votes += `-${option_value ? 1 : 0}`;
        if (option_value) count_checked++;
      }

      localStorage.setItem("votes", votes);

      if (count_checked > 0) {
        setCoolDown();
        console.log(ip);
        fetch(path + "/php/send_vote.php", fetchParams({ file_name: data.name, options: options_checked, ip: ip }))
          .then((response) => response.text())
          .then((res) => {
            for (let i = 0; i < options_checked.length; i++) {
              if (options_checked[i]) data.option_votes[i] = parseInt(data.option_votes[i]) + 1;
            }
            data.ip_list += `;${ip}`;
            showVotes(data);
          });
      } else {
        throwMessage("information", "Nie zaznaczono żadnej opcji");
      }
    } else {
      setCoolDown();
      let votes = localStorage.getItem("votes").split(";");
      let options_checked = [];

      for (let i = 1; i < votes.length; i++) {
        if (votes[i].includes(data.name)) {
          const selected_votes = votes[i].split("-");
          for (let j = 1; j < selected_votes.length; j++) {
            options_checked.push(selected_votes[j] === "1");
          }
        }
      }

      fetch(path + "/php/withdraw_vote.php", fetchParams({ file_name: data.name, options: options_checked, ip: ip }))
        .then((response) => response.text())
        .then((res) => {
          for (let i = 0; i < options_checked.length; i++) {
            if (options_checked[i]) data.option_votes[i] = parseInt(data.option_votes[i]) - 1;
          }
          data.ip_list = data.ip_list.replace(`;${ip}`, "");
          document.getElementById("options").innerHTML = "";
          fillVoting(data);
          vote.classList.replace("red", "green");
          vote.innerHTML = '<i class="fas fa-tasks"></i> Zagłosuj';
        });
    }
  });
}
