import React from "react";
import { AppStore } from "../bin/AppStore";
import { Box, Container, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../globalComponents/Header";
import Copyright from "../globalComponents/Copyright";

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
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}></div>
      </Container>
      <Box mt={8}>
        <Copyright />
      </Box>
    </>
  );
}
