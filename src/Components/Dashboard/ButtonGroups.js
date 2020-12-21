import React from "react";
import {
  Button,
  Paper,
  ButtonGroup,
  Grid,
  Typography
} from "@material-ui/core";
import useStyle from "MaterialUIStyles";
import { AppStore } from "bin/AppStore";
export default function BuildButtonGroups(command, gridIndex) {
  const classes = useStyle();
  return (
    <Grid key={gridIndex} item xs={12} sm={12} md={6} lg={6}>
      <Paper variant="outlined" elevation={2} className={classes.paperPlate}>
        <Typography variant="h4">{command.label}</Typography>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          {command.menu.map((button, buttonIndex) => {
            return (
              <Button
                size="small"
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
