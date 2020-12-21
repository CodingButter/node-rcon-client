import React, { useEffect } from "react";
import { Container, Paper, Grid, Typography } from "@material-ui/core";
import useStyle from "../../MaterialUIStyles";
import { AppStore } from "../../bin/AppStore";
import SkinHead from "../../GlobalComponents/SkinHead";

export default function SelectUser() {
  useEffect(() => {
    AppStore.sendCommand("list", false)
      .then((res) => {
        var users = res.response.body
          .split(":")[1]
          .split(",")
          .map((user) => {
            return user.trim();
          })
          .filter((user) => {
            return user.length > 0;
          });
        AppStore.setOnlineUsers(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [AppStore.connectionStatus]);

  const classes = useStyle();
  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Paper
        rounded
        variant="outlined"
        elevation={3}
        className={classes.paperPlate}
      >
        <Typography variant="h4">User Commands</Typography>
        <Container className={classes.skinHeadContainer}>
          {AppStore.onlineUsers.map((username, skinIndex) => {
            return <SkinHead key={skinIndex} username={username} />;
          })}
        </Container>
      </Paper>
    </Grid>
  );
}
