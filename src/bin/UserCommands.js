import React, { useState } from "react";
import { AppStore } from "./AppStore";
import { Input, MenuItem, MenuList, Typography } from "@material-ui/core";

const teleport = ({ username }) => {
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

  const getItems = () => {
    if (AppStore.focusedPlayer === username) {
      return (
        <MenuItem
          variant="contained"
          variant="contained"
          color="secondary"
          onClick={handleRemoveFocus}
        >
          Deselected
        </MenuItem>
      );
    }
    if (!AppStore.focusedPlayer) {
      return (
        <MenuItem
          variant="contained"
          color="primary"
          onClick={handleSetTeleporter}
        >
          <Typography>Teleport</Typography>
        </MenuItem>
      );
    }
    return (
      <MenuItem variant="contained" color="primary" onClick={handleTeleportTo}>
        Accept Teleport
      </MenuItem>
    );
  };
  return getItems();
};

const kickPlayer = ({ username }) => {
  const handleSendCommand = () => {
    if (window.confirm(`Are you Sure You Want To Kick ${username}`)) {
      const reason = prompt("Reason for Kicking?");
      if (reason) {
        //AppStore.sendCommand(`kick ${username}`, false);
        AppStore.sendCommand(
          `say ${username} was kicked because ${reason}`,
          true,
          `${username} was kicked because ${reason}`
        );
      } else {
        AppStore.updateResponse(`${username} was not kicked`);
        AppStore.updateCommandSuccess(true);
        AppStore.setOpenSnacks(true);
      }
    }
  };
  return (
    <div>
      <MenuItem onClick={handleSendCommand}>Kick</MenuItem>
    </div>
  );
};

const banPlayer = ({ username }) => {
  const handleSendCommand = () => {
    if (window.confirm(`Are you Sure You Want To Ban ${username}`)) {
      const reason = prompt("Reason for Banning?");
      if (reason) {
        //AppStore.sendCommand(`ban ${username}`);
        AppStore.sendCommand(
          `say ${username} was banned because ${reason}`,
          true,
          `${username} was banned because ${reason}`
        );
      } else {
        AppStore.updateResponse(`${username} was not banned`);
        AppStore.updateCommandSuccess(true);
        AppStore.setOpenSnacks(true);
      }
    }
  };
  return (
    <div>
      <MenuItem onClick={handleSendCommand}>Ban</MenuItem>
    </div>
  );
};

const items = [teleport, kickPlayer, banPlayer];

export default items;
