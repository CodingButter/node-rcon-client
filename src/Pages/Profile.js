import React, { useEffect, useState } from "react";
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
import SkinHead from "GlobalComponents/SkinHead";
import getPlayerInfo from "bin/PlayerInfo";
import { useLocation } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function Profile() {
  const [username, setUsername] = useState(null);
  const [playerInfo, setPlayerInfo] = useState(null);
  const classes = useStyles();
  const query = useQuery();

  const handleGetPlayerInfo = async () => {
    console.log(username);
    const info = await getPlayerInfo(username);
    console.log(info);
    setPlayerInfo(info);
  };

  useEffect(() => {
    setUsername(query.get("username"));
    username && handleGetPlayerInfo();
  }, [username]);

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
            <Container>
              <SkinHead username={username} />
            </Container>
          </Grid>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
