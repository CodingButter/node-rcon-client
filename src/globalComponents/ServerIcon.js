import React from "react";
import { AppStore } from "../bin/AppStore";
import GameServerDefaults from "../bin/GameServerDefaults";

export default function ServerIcon({ render }) {
  function getServerImageByPort(queryPort) {
    return (
      GameServerDefaults.filter(({ port }) => {
        return port === parseInt(queryPort);
      })[0]?.imagePath || "/images/server-icon.png"
    );
  }

  return <>{render(getServerImageByPort(AppStore.port))}</>;
}
