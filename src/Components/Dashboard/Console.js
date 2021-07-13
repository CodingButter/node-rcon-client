import React, { useEffect } from "react";
import { AppStore } from "bin/AppStore";
import rcon from "bin/RconApi";
import { ipToLetters } from "bin/ipletters";
const { getIp } = rcon;
const Console = () => {
  const handleSetTunnel = async () => {
    console.log("working");
    const subdomain = ipToLetters(await await getIp(AppStore.host));
    const tunnel = `https://${subdomain}.loca.lt`;
    AppStore.setPluginTunnel(tunnel);
    setInterval(handleGetConsoleData, 5000);
  };
  const handleGetConsoleData = async () => {
    AppStore.setConsoleData(
      await rcon.getConsoleData(AppStore.pluginTunnel, AppStore.password)
    );
    console.log(AppStore.consoleData);
  };
  useEffect(() => {
    handleSetTunnel();
  }, []);

  return (
    <div>
      <ul>
        {/* {AppStore.consoleData.map((line) => (
          <li>{line}</li>
        ))} */}
      </ul>
    </div>
  );
};
export default Console;
