import React from "react";
import { Container, CssBaseline } from "@material-ui/core/";
import Servers from "../Components/ServerSelect/Servers";

export default function ServerSelect({ history }) {
  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Servers />
    </Container>
  );
}
