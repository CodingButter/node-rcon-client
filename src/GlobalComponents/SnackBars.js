import React from "react";
import { AppStore } from "../bin/AppStore";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

export default function SnackBars() {
  const handleClose = (event, reason) => {
    AppStore.setOpenSnacks(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div>
      <Snackbar
        open={AppStore.openSnacks}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={AppStore.commandSuccess ? "success" : "error"}
        >
          {AppStore.response}
        </Alert>
      </Snackbar>
    </div>
  );
}
