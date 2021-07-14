import React, { useState } from "react";
import { AppStore } from "./AppStore";
import {
  Button,
  Paper,
  ButtonGroup,
  Grid,
  Typography,
} from "@material-ui/core";

const teleport = {
  label: "Teleport",
  Component: ({ username }) => {
    const handleTeleportTo = () => {
      AppStore.sendCommand(`tp ${AppStore.focusedPlayer} ${username}`);
      AppStore.updateFocusedPlayer(null);
    };
    const handleRemoveFocus = () => {
      AppStore.updateFocusedPlayer(null);
    };
    const handleSetTeleporter = () => {
      AppStore.updateFocusedPlayer(username);
    };
    const style = { fontSize: "14px" };
    const getButton = () => {
      if (AppStore.focusedPlayer === username) {
        return (
          <Button
            style={style}
            variant="contained"
            variant="contained"
            color="secondary"
            onClick={handleRemoveFocus}
          >
            Deselected
          </Button>
        );
      }
      if (!AppStore.focusedPlayer) {
        return (
          <Button
            style={style}
            variant="contained"
            color="primary"
            onClick={handleSetTeleporter}
          >
            Teleport
          </Button>
        );
      }
      return (
        <Button
          style={style}
          variant="contained"
          color="primary"
          onClick={handleTeleportTo}
        >
          Accept Teleport
        </Button>
      );
    };
    return <div>{getButton()}</div>;
  },
};
const items = [teleport, teleport, teleport, teleport, teleport];

export default items;
