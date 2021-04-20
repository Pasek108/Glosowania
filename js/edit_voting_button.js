"use strict";

function addEditListener(data, password) {
  const edit = document.getElementById("edit");
  edit.addEventListener("click", () => {
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
      const admin_password = passwd.value.trim();

      if (cooldown !== 0) {
        throwMessage("information", `Poczekaj ${cooldown}s`);
        return;
      }

      setCoolDown();

      fetch(path + "php/check_admin_passwd.php", fetchParams({ file_name: file_name, passwd: admin_password }))
        .then((response) => response.text())
        .then((res) => {
          if (res === "false") throwMessage("warning", "Hasło niepoprawne");
          else {
            if (!admin_passwords.includes(file_name)) {
              admin_passwords += `;${file_name}-${admin_password}`;
              localStorage.setItem("admin_passwords", admin_passwords);
            } else if (!admin_passwords.includes(`;${file_name}-${admin_password}`)) {
              let new_passwords = "";
              for (let i = 1; i < file_password.length; i++) {
                if (!file_password[i].includes(file_name)) {
                  new_passwords += ";" + file_password[i];
                }
              }
              new_passwords += `;${file_name}-${admin_password}`;
              localStorage.setItem("admin_passwords", new_passwords);
            }

            copyTemplate("create-voting-template");
            addPrivateVotingListener();
            addNewOptionListener();

            const date = document.getElementById("date");
            const date_clone = date.cloneNode(true);

            const term = timestampToStrings(parseInt(data.date));

            date_clone.value = `${term.year}-${term.month}-${term.day}T${term.hours}:${term.minutes}:00`;
            date_clone.style.marginRight = "0.5rem";
            date.remove();
            document.getElementById("create-voting-form").prepend(date_clone);

            const edit_header = document.createElement("h2");
            edit_header.style.marginTop = "0";
            edit_header.style.textAlign = "center";
            edit_header.innerHTML = "Edytuj głosowanie";
            document.getElementById("create-voting-form").prepend(edit_header);

            document.getElementsByClassName("priv")[0].style.display = "inline-block";
            const priv = document.getElementById("priv");
            if (data.private) {
              priv.click();
              document.getElementById("password").value = password;
            }

            const admin_password_input = document.getElementById("admin-password");
            admin_password_input.remove();

            const question_input = document.getElementById("question-input");
            question_input.value = decodeURIComponent(data.question);

            const description_input = document.getElementById("description-input");
            description_input.value = decodeURIComponent(data.description);

            const many_options = document.getElementById("many-options");
            many_options.checked = data.many_options;

            const options_inputs = document.getElementsByClassName("option-input");
            for (let i = 0; i < data.option_names.length; i++) {
              if (i < 3) options_inputs[i].value = data.option_names[i];
              else {
                const options = document.getElementById("options_inputs");
                const option_input = document.createElement("input");
                option_input.setAttribute("class", "option-input");
                option_input.setAttribute("placeholder", `Wybór ${i}`);
                option_input.setAttribute("pattern", "[A-Za-z0-9AaĄąĆćĘęŁłŃńÓóŚśŹźŻż.,?s]{0,48}");
                option_input.value = data.option_names[i];
                options.appendChild(option_input);
              }
            }

            const add_voting = document.getElementById("add-voting");
            add_voting.addEventListener("click", (e) => {});

            const voting_form = document.getElementById("create-voting-form");

            voting_form.addEventListener("submit", (e) => {
              e.preventDefault();
              if (cooldown !== 0) {
                throwMessage("information", `Poczekaj ${cooldown}s`);
                return;
              }

              setCoolDown();

              const password_input = priv.checked ? document.getElementById("password").value.trim() : "";

              const date = date_clone.valueAsNumber !== undefined ? `${new Date(date_clone.valueAsNumber).getTime() - 7200000}` : "";
              const many_options = document.getElementById("many-options").checked;
              const options = Array.from(options_inputs).map((elem) => {
                return elem.value.trim();
              });

              const send_pack = {
                file_name: file_name,
                admin_passwd: admin_password,
                term: date,
                priv: priv.checked ? 1 : 0,
                passwd: password_input,
                question: encodeURIComponent(question_input.value.trim()),
                description: encodeURIComponent(description_input.value.trim()),
                many: many_options ? 1 : 0,
                options: options,
              };

              console.log(send_pack);

              fetch(path + "php/edit_voting.php", fetchParams(send_pack))
                .then((response) => response.json())
                .then((data) => {
                  throwMessage("succes", "Pomyślnie edytowano głosowanie");
                  loadYoursAndObservedVotings();
                  openVoting(data.name);
                });
            });
          }
        });
    });
  });
}
