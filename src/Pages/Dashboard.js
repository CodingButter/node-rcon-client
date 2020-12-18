import React from "react";
import { AppStore } from "../bin/AppStore";
import {
  ButtonGroup,
  Button,
  Box,
  CssBaseline,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
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

export default function Dashboard() {
  function sendCommand({ target }) {
    rcon.send(AppStore.connectionUID, target.dataset.command);
  }

  function BuildButtonGroups(command, gridIndex) {
    return (
      <Grid key={gridIndex} item xs={12} sm={12} md={6} lg={6}>
        <Paper variant="outlined" elevation={2} className={classes.paper}>
          <Typography variant="h4">{command.label}</Typography>
          <ButtonGroup
            variant="contained"
            color="primary"
            size="large"
            aria-label="contained primary button group"
          >
            {command.menu.map((button, buttonIndex) => {
              return (
                <Button
                  onClick={sendCommand}
                  data-command={button.command}
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
      <CssBaseline />
      <Header />
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
    </>
  );
}
