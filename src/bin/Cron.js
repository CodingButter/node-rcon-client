import { AppStore } from "bin/AppStore";
import rcon from "./RconApi";
var has_focus = true;
const PING_RATE = 10000;

function checkConnectionStatus() {
  const uid = AppStore.connectionUID;
  rcon.getStatus({ uid }).then((response) => {
    console.log({ has_focus });
    if (has_focus != false) AppStore.updateConnectionStatus(response?.status);
  });
}
export default function startCron() {
  setInterval(() => checkConnectionStatus, PING_RATE);
}

function loading_time() {
  Array.from(document.querySelectorAll(":focus")).forEach(function (el) {
    if (el.id == "iframeID") has_focus = true;
  });

  setTimeout(loading_time, PING_RATE);
}

window.onblur = function () {
  has_focus = false;
  console.log("lost focus");
};
window.onfocus = function () {
  has_focus = true;
  console.log("active");
};

setTimeout(loading_time, PING_RATE);
