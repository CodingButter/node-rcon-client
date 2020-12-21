import { AppStore } from "bin/AppStore";
import rcon from "./RconApi";
const PING_RATE = 10000;

function checkConnectionStatus() {
  const uid = AppStore.connectionUID;
  rcon.getStatus({ uid }).then((response) => {
    AppStore.updateConnectionStatus(response?.status);
  });
}
export default function startCron() {
  setInterval(() => {
    checkConnectionStatus();
  }, PING_RATE);
}
