import React, { useEffect } from "react";
import { AppStore } from "../bin/AppStore";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Box,
  CssBaseline,
  TextField,
  Typography,
  Container,
  MenuItem,
  Avatar,
  Select,
  FormControl,
  InputLabel
} from "@material-ui/core";
import ServerIcon from "../globalComponents/ServerIcon";
import Copyright from "../globalComponents/Copyright";
import Rcon from "../bin/RconApi";

import GameServerDefaults from "../bin/GameServerDefaults.json";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.default
  },
  avatar: {
    margin: theme.spacing(1),
    width: 80,
    height: 80,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
    display: "inherit",
    alignItems: "middle",
    justifyContent: "center",
    color: "#fff",
    backgroundColor: theme.palette.primary.light,
    padding: "8px",
    cursor: "pointer",
    textDecoration: "none"
  }
}));

export default function ServerConnect() {
  const classes = useStyles();
  const history = useHistory();
  const rcon = Rcon();

  function Connect() {
    rcon
      .connect({
        host: AppStore.host,
        port: AppStore.port,
        password: AppStore.password
      })
      .then((results) => {
        console.log(results);
      });
  }

  function portExistsInList(queryPort) {
    const serverResultCount = GameServerDefaults.filter(({ port }) => {
      console.log({ port, queryPort });
      return port == parseInt(queryPort);
    });
    console.log(serverResultCount.length >= 1);
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
          autoFocus
        />
        {
          <TextField
            disabled={portExistsInList(AppStore.port)}
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
          disabled={!AppStore.connectReady}
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            //history.push("/dashboard");
            Connect();
          }}
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
