import React from "react";
import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AppStore } from "bin/AppStore";
import GameServerDefaults from "bin/GameServerDefaults";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.default
  },
  select: {
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
  },
  avatar: {
    margin: theme.spacing(1),
    width: 80,
    height: 80,
    backgroundColor: theme.palette.secondary.main
  }
}));

export default function Servers() {
  const history = useHistory();

  function setServer(port) {
    AppStore.updatePort(port);
    history.push("./connect");
  }

  const classes = useStyles();
  return GameServerDefaults.map((server, key) => {
    return (
      <Grid
        key={key}
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="primary"
          className={classes.select}
          to="/dashboard"
          onClick={() => {
            setServer(server.port);
          }}
        >
          <Avatar
            alt={server.name}
            className={classes.avatar}
            src={server.imagePath}
          />
          <Typography component="h1" variant="h5">
            {server.name}
          </Typography>
        </Button>
      </Grid>
    );
  });
}
