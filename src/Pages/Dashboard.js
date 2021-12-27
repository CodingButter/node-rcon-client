//update
import React, { useEffect } from "react";
import { Box, CssBaseline, Container, Grid } from "@material-ui/core";
import Header from "GlobalComponents/Header";
import Copyright from "GlobalComponents/Copyright";
import startCron from "bin/Cron";
import WeatherTime from "bin/WeatherTime.json";
import ButtonGroups from "Components/Dashboard/ButtonGroups";
import useStyles from "MaterialUIStyles";
import SelectUser from "Components/Dashboard/SelectUser";
import CustomCommand from "Components/Dashboard/CustomCommand";
import Console from "Components/Dashboard/Console";

export default function Dashboard() {
  useEffect(() => {
    startCron();
  }, []);

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
            className={classes.paperPlate}
            spacing={2}
          >
            {WeatherTime.map(ButtonGroups)}
            <SelectUser />
            <CustomCommand />
            <Console />
          </Grid>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
