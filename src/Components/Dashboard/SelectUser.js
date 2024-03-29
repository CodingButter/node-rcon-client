import React, { useEffect } from "react";
import { Box, Paper, Grid, Typography } from "@material-ui/core";
import useStyle from "MaterialUIStyles";
import { AppStore } from "bin/AppStore";
import UserMenu from "GlobalComponents/UserMenu";
import SkinHead from "GlobalComponents/SkinHead";
export default function SelectUser() {
  useEffect(() => {
    setInterval(() => {
      AppStore.sendCommand("list", false)
        .then((res) => {
          var users = res.body
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
    }, 30000);
  }, []);

  const classes = useStyle();
  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Paper variant="outlined" elevation={3} className={classes.paperPlate}>
        <Typography variant="h4">User Commands</Typography>
        <Box fullwidth className={classes.skinHeadContainer}>
          {AppStore.onlineUsers.map((username, index) => {
            return (
              <UserMenu key={index} username={username}>
                <SkinHead
                  username={username}
                  animationDuration={1.5 * Math.random() + 4}
                  animationDelay={3 * Math.random() + 2}
                />
              </UserMenu>
            );
          })}
        </Box>
      </Paper>
    </Grid>
  );
}
