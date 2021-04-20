"use strict";

function addDeleteListener(data) {
  const delete_button = document.getElementById("delete");
  delete_button.addEventListener("click", () => {
    copyTemplate("password-template");
    document.getElementById("password-form-header").innerHTML = "Podaj hasło administratora";

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

    const cancel = document.createElement("p");
    cancel.setAttribute("class", "password-cancel");
    cancel.addEventListener("click", () => openVoting(data.name));
    cancel.innerHTML = "Anuluj";
    document.getElementById("password-form").appendChild(cancel);

    const file_name = data.name;
    let admin_passwords = localStorage.getItem("admin_passwords");
    const file_password = admin_passwords.split(";");
    for (let i = 1; i < file_password.length; i++) {
      if (file_password[i].includes(file_name)) {
        passwd.value = file_password[i].split("-")[1];
      }
    }

    const input_passwd_form = document.getElementById("input-passwd-form");
    input_passwd_form.addEventListener("submit", (e) => {
      e.preventDefault();
      const password = passwd.value.trim();

      if (cooldown !== 0) {
        throwMessage("information", `Poczekaj ${cooldown}s`);
        return;
      }

      setCoolDown();

      fetch(path + "php/check_admin_passwd.php", fetchParams({ file_name: file_name, passwd: password }))
        .then((response) => response.text())
        .then((data) => {
          if (data === "false") throwMessage("warning", "Hasło niepoprawne");
          else {
            if (!admin_passwords.includes(file_name)) {
              admin_passwords += `;${file_name}-${password}`;
              localStorage.setItem("admin_passwords", admin_passwords);
            } else if (!admin_passwords.includes(`;${file_name}-${password}`)) {
              let new_passwords = "";
              for (let i = 1; i < file_password.length; i++) {
                if (!file_password[i].includes(file_name)) {
                  new_passwords += ";" + file_password[i];
                }
              }
              new_passwords += `;${file_name}-${password}`;
              localStorage.setItem("admin_passwords", new_passwords);
            }

            fetch(path + "php/set_voting_to_delete.php", fetchParams({ file_name: file_name, passwd: password }))
              .then((response) => response.text())
              .then((data) => openVoting(file_name));
          }
        });
    });
  });
}

function addRestoreListener(data) {
  const delete_button = document.getElementById("delete");
  delete_button.addEventListener("click", () => {
    copyTemplate("password-template");
    document.getElementById("password-form-header").innerHTML = "Podaj hasło administratora";

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

    const cancel = document.createElement("p");
    cancel.setAttribute("class", "password-cancel");
    cancel.addEventListener("click", () => openVoting(data.name));
    cancel.innerHTML = "Anuluj";
    document.getElementById("password-form").appendChild(cancel);

    const file_name = data.name;
    let admin_passwords = localStorage.getItem("admin_passwords");
    const file_password = admin_passwords.split(";");
    for (let i = 1; i < file_password.length; i++) {
      if (file_password[i].includes(file_name)) {
        passwd.value = file_password[i].split("-")[1];
      }
    }

    const input_passwd_form = document.getElementById("input-passwd-form");
    input_passwd_form.addEventListener("submit", (e) => {
      e.preventDefault();
      const password = passwd.value.trim();

      if (cooldown !== 0) {
        throwMessage("information", `Poczekaj ${cooldown}s`);
        return;
      }

      setCoolDown();

      fetch(path + "php/check_admin_passwd.php", fetchParams({ file_name: file_name, passwd: password }))
        .then((response) => response.text())
        .then((data) => {
          if (data === "false") throwMessage("warning", "Hasło niepoprawne");
          else {
            if (!admin_passwords.includes(file_name)) {
              admin_passwords += `;${file_name}-${password}`;
              localStorage.setItem("admin_passwords", admin_passwords);
            } else if (!admin_passwords.includes(`;${file_name}-${password}`)) {
              let new_passwords = "";
              for (let i = 1; i < file_password.length; i++) {
                if (!file_password[i].includes(file_name)) {
                  new_passwords += ";" + file_password[i];
                }
              }
              new_passwords += `;${file_name}-${password}`;
              localStorage.setItem("admin_passwords", new_passwords);
            }

            fetch(path + "php/restore_voting.php", fetchParams({ file_name: file_name, passwd: password }))
              .then((response) => response.text())
              .then((data) => {
                console.log(data);
                openVoting(file_name);
              });
          }
        });
    });
  });
}
