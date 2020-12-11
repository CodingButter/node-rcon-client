import React, { useEffect } from "react";
import Connect from "./Pages/Connect";
import Dashboard from "./Pages/Dashboard";
import ServerSelect from "./Pages/ServerSelect";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppStore, addToStore } from "./bin/AppStore.js";

export default function App() {
  //Lets Put Global state here

  addToStore("connectionStatus", "updateConnectionStatus");
  addToStore("host", "updateHost", "");
  addToStore("port", "updatePort", 25575);
  addToStore("password", "updatePassword", "");

  //Lets do an Mount Hook
  useEffect(() => {
    console.log("this only ran on mount");
  }, []);

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
      <div>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/connect">
            <Connect />
          </Route>
          <Route path="/">
            <ServerSelect />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
