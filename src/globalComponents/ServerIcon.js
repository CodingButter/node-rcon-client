import { AppStore } from "../bin/AppStore";
import GameServerDefaults from "../bin/GameServerDefaults";

export default function ServerIcon({ render }) {
  function getServerImageByPort(queryPort) {
    return (
      GameServerDefaults.filter(
        ({ port }) => port === parseInt(queryPort)
      )[0] || GameServerDefaults[0]
    );
  }

  return render(getServerImageByPort(AppStore.port));
}
