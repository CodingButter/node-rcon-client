import { AppStore } from "./AppStore";
import Rcon from "./RconApi";
const rcon = Rcon();
const PING_RATE = 10000;

function checkConnectionStatus() {
  rcon.getStatus(AppStore.connectionUID).then(({ status }) => {
    console.log({ status });
    AppStore.updateConnectionStatus(status);
  });
}

setInterval(() => {
  checkConnectionStatus();
}, PING_RATE);
