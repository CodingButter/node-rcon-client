import React, { useEffect } from "react";
import ServerConnect from "./Pages/ServerConnect";
import Dashboard from "./Pages/Dashboard";
import ServerSelect from "./Pages/ServerSelect";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppStore, addToStore } from "./bin/AppStore.js";
import Rcon from "./bin/RconApi";
const rcon = Rcon();

export default function App() {
  //Lets Put Global state here

  addToStore("connectionStatus", "updateConnectionStatus");
  addToStore("connectReady", "updateConnectReady", false);
  addToStore("connectionUID", "updateConnectionUID", null);
  addToStore("responseUID", "updateResponseUID", null);
  addToStore("response", "updateResponse", null);
  addToStore("commandSuccess", "updateCommandSuccess", false);
  addToStore("host", "updateHost", "");
  addToStore("port", "updatePort", 25575);
  addToStore("password", "updatePassword", "");

  AppStore.rconConnect = async () => {
    return new Promise((resolve, reject) => {
      rcon
        .connect({
          host: AppStore.host,
          port: AppStore.port,
          password: AppStore.password
        })
        .then((results) => {
          AppStore.updateConnectionUID(results.uid);
          AppStore.updateConnectionStatus(results.status);
          if (results.status !== "connected") alert(`Couldnt reconnect!`);
          resolve(results);
        });
    });
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
  );
}
