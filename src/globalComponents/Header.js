import React from "react";
import HeaderMenu from "./HeaderMenu";
import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "red"
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar display="flex">
        <Typography variant="h6" className={classes.title}>
          Dashboard
        </Typography>
      </Toolbar>
      <HeaderMenu display="flex" />
    </AppBar>
  );
}
