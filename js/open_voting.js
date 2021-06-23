"use strict";

function openVoting(file_name = "") {
  if (href.length > 1) {
    const link_not_correct = href[1].trim() === "" || href[1].trim().length !== 20;

    if (link_not_correct) {
      window.location.href = path;
      return;
    }
  }

  if (href[1] === undefined && file_name === "") return;

  if (file_name === "") file_name = href[1];

  let is_private = false;
  let password = "";

  fetch(path + "php/is_private.php", fetchParams({ file_name: file_name }))
    .then((response) => response.json())
    .then((data) => {
      if (data.is_private === "error") {
        throwMessage("warning", "Nie znaleziono głosowania");
        copyTemplate("main-page-template");
      } else {
        if (data.is_private) {
          let passwords = localStorage.getItem("passwords");
          is_private = true;
          copyTemplate("password-template");

          const passwd = document.getElementById("passwd");
          const show_password = document.getElementById("show-password");
          const show_password_icon = document.getElementById("show-password-icon");

          show_password.addEventListener("click", () => {
            if (passwd.getAttribute("type") === "password") {
              passwd.setAttribute("type", "text");
              show_password.setAttribute("title", "Ukryj hasło");
              show_password_icon.classList.replace("fa-eye", "fa-eye-slash");
            } else {
              passwd.setAttribute("type", "password");
              show_password.setAttribute("title", "Pokaż hasło");
              show_password_icon.classList.replace("fa-eye-slash", "fa-eye");
            }
          });

          const file_password = passwords.split(";");
          for (let i = 1; i < file_password.length; i++) {
            if (file_password[i].includes(file_name)) {
              passwd.value = file_password[i].split("-")[1];
            }
          }

          const input_passwd_form = document.getElementById("input-passwd-form");
          input_passwd_form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            evtWithCoolDown(evt, check_passwd);
          });

          const check_passwd = (evt) => {
            password = passwd.value.trim();

            fetch(path + "php/check_passwd.php", fetchParams({ file_name: file_name, passwd: password }))
              .then((response) => response.text())
              .then((data) => {
                if (data === "false") throwMessage("warning", "Hasło niepoprawne");
                else {
                  if (!passwords.includes(file_name)) {
                    passwords += `;${file_name}-${password}`;
                    localStorage.setItem("passwords", passwords);
                  } else if (!passwords.includes(`;${file_name}-${password}`)) {
                    let new_passwords = "";
                    for (let i = 1; i < file_password.length; i++) {
                      if (!file_password[i].includes(file_name)) {
                        new_passwords += ";" + file_password[i];
                      }
                    }
                    new_passwords += `;${file_name}-${password}`;
                    localStorage.setItem("passwords", new_passwords);
                  }
                  showVoting(file_name, password, is_private);
                }
              });
          };
        } else showVoting(file_name, password, is_private);
      }
    });
}

openVoting();
