"use strict";

const contact = document.getElementById("contact");

contact.addEventListener("click", () => {
  copyTemplate("contact-template");

  const contact_form = document.getElementsByClassName("contact")[0];
  contact_form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    evtWithCoolDown(evt, send_message);
  });
  const send_message = (evt) => {
    alert("a");
  };
});
