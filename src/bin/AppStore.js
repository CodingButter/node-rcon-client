import { useState } from "react";
import { GLOBAL as GlobalKeys } from "./StorageKeys.json";

const AppStore = {};
function add(key, defaultValue, pullFromStorage = true) {
  if (!pullFromStorage) {
    return defaultValue;
  } else {
    const localValue = localStorage.getItem(GlobalKeys[key]);
    if (localValue !== null) {
      return localValue;
    } else {
      localStorage.setItem(GlobalKeys[key], defaultValue);
      return defaultValue;
    }
  }
}

const addToStore = (
  stateVar,
  stateVarUpdater,
  defaultValue,
  addToStorage = true
) => {
  var [aState, aStateUpdater] = useState(
    add(stateVar, defaultValue, addToStorage)
  );
  AppStore[stateVar] = aState;
  AppStore[stateVarUpdater] = (updateValue) => {
    if (addToStorage) {
      localStorage.setItem(GlobalKeys[stateVar], updateValue);
    } else {
      localStorage.removeItem(GlobalKeys[stateVar]);
    }
    aStateUpdater(updateValue);
  };
};

export { AppStore, addToStore };
