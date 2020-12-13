import React, { useState } from "react";
import { Box, Button, MenuItem, Menu } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useHistory } from "react-router-dom";

export default function HeaderMenu() {
  function connectToServer(e) {}

  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" flexDirection="row">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={connectToServer}>
          <RefreshIcon />
          Reconnect
        </MenuItem>
        <MenuItem>
          <Button
            onClick={() => {
              history.push("/");
            }}
          >
            Change Server
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
}
