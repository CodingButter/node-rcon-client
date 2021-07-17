import React, { useEffect, useState } from "react";
import { Box, CssBaseline, Container, Grid } from "@material-ui/core";
import { AppStore } from "bin/AppStore";
import Header from "GlobalComponents/Header";
import Copyright from "GlobalComponents/Copyright";
import useStyles from "MaterialUIStyles";
import SkinHead from "GlobalComponents/SkinHead";
import PlayerInfo from "bin/PlayerInfo";
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
    const info = await PlayerInfo(username);
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
