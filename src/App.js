import React, { useEffect } from "react";
import ServerConnect from "./Pages/ServerConnect";
import Dashboard from "./Pages/Dashboard";
import ServerSelect from "./Pages/ServerSelect";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppStore, addToStore } from "./bin/AppStore.js";

export default function App() {
  //Lets Put Global state here

  addToStore("connectionStatus", "updateConnectionStatus");
  addToStore("connectReady", "updateConnectReady", false);
  addToStore("host", "updateHost", "");
  addToStore("port", "updatePort", 25575);
  addToStore("password", "updatePassword", "");
  addToStore("connectionUID", "updateCpmmectopmIID", "");

  //update whenever port/host/password changes
  useEffect(() => {
    AppStore.updateConnectReady(
      AppStore.port != false &&
        AppStore.host != false &&
        AppStore.password != false
    );
  }, [AppStore.port, AppStore.host, AppStore.password]);

  //Handle Update Functions
  AppStore.handlePortUpdate = ({ target }) => {
    AppStore.updatePort(target.value);
  };

  AppStore.handleHostUpdate = ({ target }) => {
    AppStore.updateHost(target.value);
  };

  AppStore.handlePasswordUpdate = ({ target }) => {
    AppStore.updatePassword(target.value);
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
