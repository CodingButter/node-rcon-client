import React, { useRef, useEffect } from "react";
import { AppStore } from "../bin/AppStore";
import { useHistory } from "react-router-dom";
import useStyles from "../MaterialUIStyles";
import {
  Button,
  Box,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Avatar
} from "@material-ui/core";
import ServerIcon from "../GlobalComponents/ServerIcon";
import Copyright from "../GlobalComponents/Copyright";

import GameServerDefaults from "../bin/GameServerDefaults.json";

export default function ServerConnect() {
  const classes = useStyles();
  const history = useHistory();
  const myRef = useRef(null);

  useEffect(() => {
    if (AppStore.connectReady) myRef.current.scrollIntoView();
  }, []);

  function handleConnectClick() {
    AppStore.rconConnect().then(({ uid, status }) => {
      if (status === "connected") history.push("/dashboard");
    });
  }

  function portExistsInList(queryPort) {
    const serverResultCount = GameServerDefaults.filter(({ port }) => {
      return port === parseInt(queryPort);
    });
    return serverResultCount.length >= 1;
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
        {/*
        <FormControl
          fullWidth
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Game Type
          </InputLabel>
          <Select
            defaultValue={AppStore.port}
            onChange={AppStore.handlePortUpdate}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Game Type"
          >
            <MenuItem value="">
              <em>Select Game</em>
            </MenuItem>
            {GameServerDefaults.map((GameServerDefault, key) => {
              return (
                <MenuItem key={key} value={GameServerDefault.port}>
                  {GameServerDefault.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
          */}
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
        <Button
          ref={myRef}
          disabled={!AppStore.connectReady}
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleConnectClick}
          autoFocus={AppStore.connectReady == true}
        >
          Connect
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
