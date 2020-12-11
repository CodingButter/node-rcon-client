import React from "react";
import { Copyright, Container, Box, CssBaseline } from "@material-ui/core/";
import Servers from "../Components/ServerSelect/Servers";

export default function ServerSelect({ history }) {
  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Servers />
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
