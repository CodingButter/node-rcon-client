import React, { useRef, useEffect } from "react";
import { AppStore } from "bin/AppStore";
import { useHistory } from "react-router-dom";
import useStyles from "MaterialUIStyles";
import rcon from "bin/RconApi";
import {
  Button,
  Box,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Avatar,
  Paper,
  makeStyles,
} from "@material-ui/core";
import ServerIcon from "../GlobalComponents/ServerIcon";
import Copyright from "../GlobalComponents/Copyright";

const ServerConnect = () => {
  const classes = useStyles();
  const history = useHistory();
  const myRef = useRef(null);
  const customStyle = makeStyles((theme) => {
    return {
      console: {
        width: "80%",
        height: "250px",
        "&::before": {
          content: "",
          display: "block",
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 10,
          top: 0,
          background: `linear-gradient(rgba(0, 0, 0, 0.0) 0%,${theme.palette.background.default}  100%)`,
        },
      },
    };
  });

  useEffect(() => {
    if (AppStore.connectReady) myRef.current.scrollIntoView();
  }, []);

  async function handleConnectClick() {
    const status = await AppStore.getGameServerStatus();
    if (status !== "ready") {
      AppStore.updateResponse(`Server is ${status}`);
      AppStore.updateCommandSuccess(true);
      AppStore.updateServerRunning(status);
      AppStore.setOpenSnacks(true);
      setInterval(handleGetConsoleData, 5000);
    } else {
      AppStore.rconConnect().then(({ uid, status }) => {
        if (status === "connected") history.push("/dashboard");
      });
    }
  }
  async function handleStartServer() {
    const resp = await AppStore.startServer();
    AppStore.updateServerRunning(resp.status);
    return resp.status;
  }

  const handleGetConsoleData = async () => {
    const resp = await rcon.getConsoleData(
      AppStore.pluginTunnel,
      AppStore.password
    );
    if (resp.data) {
      AppStore.setConsoleData(resp.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Connect To Server
        </Typography>
        <ServerIcon
          render={({ imagePath, name }) => {
            return (
              <Avatar alt={name} className={classes.avatar} src={imagePath} />
            );
          }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Host"
          name="host"
          onChange={AppStore.handleHostUpdate}
          value={AppStore.host}
          autoFocus={!AppStore.connectReady}
        />
        {
          <TextField
            //disabled={portExistsInList(AppStore.port)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="port"
            label="Port"
            name="port"
            onChange={AppStore.handlePortUpdate}
            value={AppStore.port}
          />
        }
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={AppStore.password}
          onChange={AppStore.handlePasswordUpdate}
          id="password"
        />
        {(() => {
          if (AppStore.serverRunning === "not running") {
            return (
              <Button
                ref={myRef}
                disabled={!AppStore.connectReady}
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={handleStartServer}
                autoFocus={AppStore.connectReady === true}
              >
                Start Server
              </Button>
            );
          } else {
            return (
              <Button
                ref={myRef}
                disabled={!AppStore.connectReady}
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleConnectClick}
                autoFocus={AppStore.connectReady === true}
              >
                Connect
              </Button>
            );
          }
        })()}
        {(() => {
          if (AppStore.consoleData) {
            return <Paper id="console">{AppStore.consoleData}</Paper>;
          }
        })()}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default ServerConnect;
