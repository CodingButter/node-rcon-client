import React from "react";
import { AppStore } from "../bin/AppStore";
import { NavLink } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Copyright from "../globalComponents/Copyright";

import ServerIcon from "../globalComponents/ServerIcon";
import GameServerDefaults from "../bin/GameServerDefaults.json";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.default
  },
  avatar: {
    margin: theme.spacing(1),
    width: 80,
    height: 80,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
    display: "inherit",
    alignItems: "middle",
    justifyContent: "center",
    color: "#fff",
    backgroundColor: theme.palette.primary.light,
    padding: "8px",
    cursor: "pointer",
    textDecoration: "none"
  },
  servericon: {
    width: "100%"
  }
}));

export default function SignIn({ history }) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <ServerIcon
          render={(imagePath) => {
            return <Avatar className={classes.avatar} src={imagePath} />;
          }}
        />
        <Typography component="h1" variant="h5">
          Connect To Server
        </Typography>
        <FormControl
          fullWidth
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Game Type
          </InputLabel>
          <Select
            defaultValue={AppStore.port}
            onChange={AppStore.handlePortUpdate}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Game Type"
          >
            <MenuItem value="">
              <em>Select Game</em>
            </MenuItem>
            {GameServerDefaults.map((GameServerDefault, key) => {
              return (
                <MenuItem key={key} value={GameServerDefault.port}>
                  {GameServerDefault.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Host"
          name="host"
          onChange={AppStore.handleHostUpdate}
          value={AppStore.host}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="port"
          label="Port"
          name="port"
          onChange={AppStore.handlePortUpdate}
          value={AppStore.port}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={AppStore.password}
          onChange={AppStore.handlePasswordUpdate}
          id="password"
        />
        <NavLink
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          to="/dashboard"
        >
          Connect
        </NavLink>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
