import React from "react";
import { AppStore } from "../bin/AppStore";
import { makeStyles, Box, AppBar, Typography } from "@material-ui/core/";
import DnsIcon from "@material-ui/icons/Dns";
import RefreshIcon from "@material-ui/icons/Refresh";
export default function Header() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: "red"
    },
    hostName: {
      fontSize: 13,
      flexGrow: 1,
      textAlign: "center"
    },
    dnsIcon: {
      fontSize: 40,
      color: theme.palette.success.main,
      backgroundColor: "white",
      borderRadius: "50%",
      padding: 3
    },
    refreshIcon: {
      cursor: "pointer",
      fontSize: 40,
      color: theme.palette.error.main,
      backgroundColor: "white",
      borderRadius: "50%",
      padding: theme.spacing(1)
    },
    appBar: {
      padding: theme.spacing(1)
    }
  }));

  function getStatusIcon(status) {
    if (status === "connected") {
      return <DnsIcon className={classes.dnsIcon} />;
    } else {
      return (
        <RefreshIcon
          onClick={AppStore.rconConnect}
          className={classes.refreshIcon}
        />
      );
    }
  }

  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.appBar} position="static">
        <Box>
          {getStatusIcon(AppStore.connectionStatus)}
          <Typography className={classes.hostName}>
            {AppStore.host.toUpperCase()}
          </Typography>
        </Box>
      </AppBar>
    </>
  );
}
