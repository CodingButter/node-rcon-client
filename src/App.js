import React, { useEffect } from "react";
import ServerConnect from "./Pages/ServerConnect";
import Dashboard from "./Pages/Dashboard";
import ServerSelect from "./Pages/ServerSelect";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppStore, addToStore } from "./bin/AppStore.js";
import { Snackbar } from "@material-ui/core";
import Rcon from "./bin/RconApi";
const rcon = Rcon();
import MuiAlert from "@material-ui/lab/Alert";

import SkinHead from "./globalComponents/SkinHead";
export default function App() {
  //Lets Put Global state here

  addToStore("connectionStatus", "updateConnectionStatus");
  addToStore("connectReady", "updateConnectReady", false);
  addToStore("connectionUID", "updateConnectionUID", null);
  addToStore("responseUID", "updateResponseUID", null, false);
  addToStore("response", "updateResponse", null, false);
  addToStore("commandSuccess", "updateCommandSuccess", false);
  addToStore("host", "updateHost", "");
  addToStore("port", "updatePort", 25575);
  addToStore("password", "updatePassword", "");
  addToStore("openAlert", "setOpenAlert", false, false);

  AppStore.rconConnect = async () => {
    return new Promise((resolve, reject) => {
      rcon
        .connect({
          host: AppStore.host,
          port: AppStore.port,
          password: AppStore.password
        })
        .then((results) => {
          console.log(results);
          AppStore.updateConnectionUID(results.uid);
          AppStore.updateConnectionStatus(results.status);
          if (results.status !== "connected") {
            console.log(results.status);
            AppStore.updateResponse("Couldn't Connect");
            AppStore.setOpenAlert(true);
            resolve(results);
          }
        });
    });
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    AppStore.setOpenAlert(false);
  };

  useEffect(() => {
    checkConnectionReady();
  }, []);

  //update whenever port/host/password changes
  function checkConnectionReady() {
    const ready =
      AppStore.port != false &&
      AppStore.host != false &&
      AppStore.password != false;
    AppStore.updateConnectReady(ready);
  }

  //Handle Update Functions
  AppStore.handlePortUpdate = ({ target }) => {
    AppStore.updatePort(target.value);
    checkConnectionReady();
  };

  AppStore.handleHostUpdate = ({ target }) => {
    AppStore.updateHost(target.value);
    checkConnectionReady();
  };

  AppStore.handlePasswordUpdate = ({ target }) => {
    AppStore.updatePassword(target.value);
    checkConnectionReady();
  };

  return (
    <>
      <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/connect">
            <ServerConnect />
          </Route>
          <Route path="/">
            <ServerSelect />
          </Route>
        </Switch>
      </Router>
      <Snackbar
        open={AppStore.openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={AppStore.commandSuccess ? "success" : "error"}
        >
          {AppStore.response}
        </Alert>
      </Snackbar>
    </>
  );
}
