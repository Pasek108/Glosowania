"use strict";

function addArrowsListners(data) {
  const prev_voting_name = data.prev;
  const prev_button = document.getElementById("prev");

  if (prev_voting_name.length === 0) prev.style.color = "#a2a2a2";
  else {
    const openPrevVoting = () => openVoting(prev_voting_name);
    prev_button.addEventListener("click", () => evtWithCoolDown(openPrevVoting));
  }

  const next_voting_name = data.next;
  const next_button = document.getElementById("next");

  if (next_voting_name.length === 0) next.style.color = "#a2a2a2";
  else {
    const openNextVoting = () => openVoting(next_voting_name);
    next_button.addEventListener("click", () => evtWithCoolDown(openNextVoting));
  }
}
