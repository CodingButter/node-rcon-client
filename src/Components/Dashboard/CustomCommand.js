import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  TextField,
  Paper,
  Grid,
  Typography
} from "@material-ui/core";
import useStyle from "../../MaterialUIStyles";
import { AppStore } from "../../bin/AppStore";

export default function SelectUser() {
  useEffect(() => {
    AppStore.sendCommand("list", false)
      .then((res) => {
        const users = res.response.body
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
  }, []);
  const classes = useStyle();
  const [command, setCommand] = useState();

  function handleSendCommand() {
    AppStore.sendCommand(command);
    setCommand("");
  }

  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Paper variant="outlined" elevation={2} className={classes.paperPlate}>
        <Typography variant="h4">Custom Commands</Typography>
        <Container className={classes.flexContainer}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="custom_command"
            value={command}
            onChange={({ target }) => {
              setCommand(target.value);
            }}
            onKeyDown={(e) => {
              if (e.which === 13) {
                handleSendCommand();
              }
            }}
            label="op Your Mom"
            name="customcommand"
          />
          <Container style={{ alignItem: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendCommand}
            >
              Send Command
            </Button>
          </Container>
        </Container>
      </Paper>
    </Grid>
  );
}
