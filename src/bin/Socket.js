import { ipToLetters } from "./ipletters";
import rcon from "./RconApi";
import { io } from "socket.io-client";

const { getIp } = rcon;
export const getSocket = async (ipdomain, password) => {
  console.log("gotresponse");
  const subdomain = ipToLetters(await await getIp(ipdomain));
  const tunnel = `https://${subdomain}.loca.lt`;
  console.log(tunnel);
  const socket = io(tunnel, {
    extraHeaders: {
      password,
      "Bypass-Tunnel-Reminder": true,
    },
  });
  return socket;
};
