import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { AppStore } from "bin/AppStore";
import rcon from "bin/RconApi";

const Console = () => {
  const useStyles = makeStyles((theme) => ({
    container: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      border: "1px solid rgba(255,255,255,.7)",
      borderRadius: 5,
      padding: 0,
      display: AppStore.showConsole === true ? "block" : "none",
      width: "80%",
      height: "400px",
      zIndex: 3,
      background: "#444",
      overflow: "hidden",
      boxShadow: "-3px 3px 8px 2px rgba(0,0,0,.7)",
      margin: theme.spacing(1),
      overflowY: "auto",
    },
    list: {
      listStyle: "none",
    },
    line: {
      color: "white",
      textAlign: "left",
    },
  }));
  const handleGetConsoleData = async () => {
    const resp = await rcon.getConsoleData(
      AppStore.pluginTunnel,
      AppStore.password
    );
    if (resp.data) {
      AppStore.setConsoleData(resp.data);
    }
  };
  const handleScroll = (e) => {
    if (e.target.scrollTop >= e.target.scrollHeight - e.target.offsetHeight) {
      AppStore.updateScrollConsole(true);
    } else {
      AppStore.updateScrollConsole(false);
    }
  };
  useEffect(() => {
    setInterval(handleGetConsoleData, 5000);
  }, []);
  useEffect(() => {
    const consoleContainer = document.querySelector("#ConsoleContainer");

    setInterval(() => {
      if (AppStore.scrollConsole) {
        consoleContainer.scrollTop = consoleContainer.scrollHeight;
      }
    }, 1000);
  }, []);
  const classes = useStyles();
  return (
    <Container
      onScroll={handleScroll}
      className={classes.container}
      id="ConsoleContainer"
    >
      <ul className={classes.list}>
        {AppStore.consoleData.map((line, lineIndex) => (
          <li key={lineIndex} className={classes.line}>
            {line}
          </li>
        ))}
      </ul>
    </Container>
  );
};
export default Console;
