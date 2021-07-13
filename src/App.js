import React, { useEffect } from "react";
import { AppStore, useAddToStore } from "bin/AppStore";
import ServerConnect from "Pages/ServerConnect";
import Dashboard from "Pages/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SnackBars from "GlobalComponents/SnackBars";
import rcon from "bin/RconApi";

export default function App() {
  //Create AppStore useHooks
  useAddToStore("connectionStatus", "updateConnectionStatus");
  useAddToStore("connectReady", "updateConnectReady", false);
  useAddToStore("connectionUID", "updateConnectionUID", null);
  useAddToStore("responseUID", "updateResponseUID", null);
  useAddToStore("response", "updateResponse", null);
  useAddToStore("commandSuccess", "updateCommandSuccess", false);
  useAddToStore("host", "updateHost", "");
  useAddToStore("port", "updatePort", 25575);
  useAddToStore("password", "updatePassword", "");
  useAddToStore("openSnacks", "setOpenSnacks", false, false);
  useAddToStore("onlineUsers", "setOnlineUsers", [], false);
  useAddToStore("pluginConnected", "updatePluginConnected", false);
  useAddToStore("consoleData", "setConsoleData", []);
  useAddToStore("pluginTunnel", "setPluginTunnel", "");

  //Create Global Appstore Functions

  /*
    Send a command to the my custom rcon REST API
    If openSnackBar is not manually set to false we will open
    The SnackBar (pop up) and display the response from the server
    Or manually change the response if we recieve no response
    From the rest api
  */
  AppStore.sendCommand = async (command, openSnackBar = true) => {
    return new Promise((resolve, reject) => {
      //Set uid to the connectionUID state
      const uid = AppStore.connectionUID;

      //Send a command through our rcon front end objects send method
      rcon.send({ uid, command }).then(async (result) => {
        if (result.connection === "connected") {
          //If the response connection is good then lets
          //retrieve the response from the Rest api
          if (result.status === "success") {
            //If our response is different then the last
            //Set
            if (result.uid !== uid) {
              AppStore.updateResponseUID(result.uid);
              AppStore.updateResponse(result.body);
              AppStore.updateCommandSuccess(true);
            } else {
              AppStore.updateResponse(result.error);
              AppStore.updateCommandSuccess(false);
            }
          }
          AppStore.setOpenSnacks(openSnackBar);
          resolve(result);
        } else {
          AppStore.updateResponse("Connection Lost");
          AppStore.updateCommandSuccess(false);
          AppStore.setOpenSnacks(openSnackBar);
          reject("couldn't connect");
        }
      });
    });
  };

  AppStore.rconConnect = async () => {
    return new Promise((resolve, reject) => {
      rcon
        .connect({
          host: AppStore.host,
          port: AppStore.port,
          password: AppStore.password,
        })
        .then((results) => {
          console.log({ results });
          AppStore.updateConnectionUID(results.uid);
          AppStore.updateConnectionStatus(results.status);
          if (results.status !== "connected") {
            AppStore.updateResponse("Couldn't Connect To Server");
            AppStore.updateCommandSuccess(false);
            AppStore.setOpenSnacks(true);
          }
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
    <div>
      <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <ServerConnect />
          </Route>
        </Switch>
      </Router>
      <SnackBars />
    </div>
  );
}
