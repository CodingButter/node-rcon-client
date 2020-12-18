import React, { useState } from "react";
import { AppStore } from "../bin/AppStore";
import {
  ButtonGroup,
  Button,
  Box,
  CssBaseline,
  Container,
  Grid,
  Paper,
  Snackbar,
  Typography
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../globalComponents/Header";
import Copyright from "../globalComponents/Copyright";
import "../bin/Cron";
import WeatherTime from "../bin/WeatherTime.json";
import Rcon from "../bin/RconApi";

const rcon = Rcon();
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  AppStore.sendCommand = (command) => {
    const uid = AppStore.connectionUID;
    rcon.send({ uid, command }).then((commandResponse) => {
      if (commandResponse.connection === "connected") {
        rcon.getResponse({ uid }).then((result) => {
          if (result.status === "success") {
            if (result.response.uid !== uid) {
              AppStore.updateResponseUID(result.response.uid);
              AppStore.updateResponse(result.response.body);
              AppStore.updateCommandSuccess(true);
            } else {
              AppStore.updateResponse(result.error);
              AppStore.updateCommandSuccess(false);
            }
          }
          setOpen(true);
        });
      } else {
        AppStore.updateResponse("Connection Lost");
        AppStore.updateCommandSuccess(false);
        setOpen(true);
      }
    });
  };

  function BuildButtonGroups(command, gridIndex) {
    return (
      <Grid key={gridIndex} item xs={12} sm={12} md={6} lg={6}>
        <Paper variant="outlined" elevation={2} className={classes.paper}>
          <Typography variant="h4">{command.label}</Typography>
          <ButtonGroup
            variant="contained"
            color="primary"
            size="small"
            aria-label="contained primary button group"
          >
            {command.menu.map((button, buttonIndex) => {
              return (
                <Button
                  onClick={() => {
                    AppStore.sendCommand(button.command);
                  }}
                  key={buttonIndex}
                >
                  {button.label}
                </Button>
              );
            })}
          </ButtonGroup>
        </Paper>
      </Grid>
    );
  }

  const classes = useStyles();

  return (
    <>
      <Header />
      <Container fullWidth>
        <CssBaseline />
        <div className={classes.root}>
          <Grid
            alignItems="center"
            container
            direction="row"
            className={classes.paper}
            spacing={2}
          >
            {WeatherTime.map(BuildButtonGroups)}
          </Grid>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={AppStore.commandSuccess ? "success" : "error"}
          >
            {AppStore.response}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
