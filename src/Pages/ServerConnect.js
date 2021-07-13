import React, { useRef, useEffect } from "react";
import { AppStore } from "bin/AppStore";
import { useHistory } from "react-router-dom";
import useStyles from "MaterialUIStyles";
import {
  Button,
  Box,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Avatar,
} from "@material-ui/core";
import ServerIcon from "../GlobalComponents/ServerIcon";
import Copyright from "../GlobalComponents/Copyright";

const ServerConnect = () => {
  const classes = useStyles();
  const history = useHistory();
  const myRef = useRef(null);

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
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default ServerConnect;
