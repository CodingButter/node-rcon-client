import { AppStore } from "./AppStore";
import Rcon from "./RconApi";
const rcon = Rcon();
const PING_RATE = 10000;

function checkConnectionStatus() {
  const uid = AppStore.connectionUID;
  rcon.getStatus({ uid }).then(({ status }) => {
    AppStore.updateConnectionStatus(status);
  });
}

setInterval(() => {
  checkConnectionStatus();
}, PING_RATE);
