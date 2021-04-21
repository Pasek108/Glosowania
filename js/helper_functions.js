"use strict";

function copyTemplate(id) {
  const content = document.getElementById("content");
  const template = document.getElementById(id);

  const newContent = template.content.firstElementChild.cloneNode(true);
  content.innerHTML = "";
  content.appendChild(newContent);
}

function throwMessage(type = "information", text = "") {
  const template = document.getElementById("message-template");

  const message = template.content.firstElementChild.cloneNode(true);
  message.setAttribute("class", type);
  message.innerHTML = text + message.innerHTML;

  const icon_container = document.createElement("div");
  icon_container.setAttribute("class", "icon");

  const icon = document.createElement("i");
  switch (type) {
    case "warning":
      icon.setAttribute("class", "fas fa-exclamation");
      break;

    case "succes":
      icon.setAttribute("class", "fas fa-check");
      break;

    default:
      icon.setAttribute("class", "fas fa-info");
  }

  icon_container.appendChild(icon);
  message.appendChild(icon_container);

  const info = document.getElementById("info");
  info.appendChild(message);
  setTimeout(() => {
    message.style.opacity = "0";
    setTimeout(() => info.removeChild(message), 500);
  }, 3000);
}

function fetchParams(data = {}) {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
}

function switchIcon(elem) {
  elem.classList.toggle("far");
  elem.classList.toggle("fas");
}

function isDefined(object) {
  if (object === undefined || object === null) return false;
  return true;
}

function defineDOMElement(element, definition = { attributes: {}, events: {}, inner_html: element.innerHTML }) {
  if (!isDefined(definition.attributes)) definition.attributes = {};
  if (!isDefined(definition.events)) definition.events = {};
  if (!isDefined(definition.inner_html)) definition.inner_html = "";

  const attributes = definition.attributes;
  const attrib_names = Object.keys(attributes);
  for (let i = 0; i < attrib_names.length; i++) {
    element.setAttribute(attrib_names[i], attributes[attrib_names[i]]);
  }

  const events = definition.events;
  const events_names = Object.keys(events);
  for (let i = 0; i < events_names.length; i++) {
    element.addEventListener(events_names[i], events[events_names[i]]);
  }

  element.innerHTML = definition.inner_html;
}

function copyLinkListener(element, file_name = "", callback) {
  element.addEventListener("click", () => {
    const temp_input = document.createElement("input");
    temp_input.setAttribute("type", "text");
    temp_input.setAttribute("value", `${path}?${file_name}`);
    element.appendChild(temp_input);

    temp_input.select();
    temp_input.setSelectionRange(0, 99999);
    document.execCommand("copy");

    callback();
  });
}

function timestampToStrings(timestamp) {
  const temp_date = new Date(timestamp);
  return {
    day: temp_date.getDate().toString().padStart(2, "0"),
    month: (temp_date.getMonth() + 1).toString().padStart(2, "0"),
    year: temp_date.getFullYear(),
    hours: temp_date.getHours().toString().padStart(2, "0"),
    minutes: temp_date.getMinutes().toString().padStart(2, "0"),
  };
}

function evtWithCoolDown(evt, callback) {
  evt.preventDefault();
  if (cooldown !== 0) {
    throwMessage("information", `Poczekaj ${cooldown}s`);
    return;
  }

  setCoolDown();
  callback(evt);
}

function localStorageAddKey(name = "", text = "") {
  if (name === "") return;

  let item = localStorage.getItem(name);
  item += text;
  localStorage.setItem(name, item);
}

const getLocalStorageItem = (name) => localStorage.getItem(name).split(";");
const addClassToElem = (className, elem) => elem.classList.add(className);
const removeClassFromElem = (className, elem) => elem.classList.remove(className);
