import React from "react";
import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import GameServerDefaults from "../../bin/GameServerDefaults";

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
  const classes = useStyles();
  return GameServerDefaults.map((server, key) => {
    return (
      <Grid
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
        >
          <Avatar className={classes.avatar} src={server.imagePath} />;
          <Typography component="h1" variant="h5">
            {server.name}
          </Typography>
        </Button>
      </Grid>
    );
  });
}
