import { AppBar, Container } from "@material-ui/core";
import React from "react";
import Barsesion from "./bar/Barsesion";

const AppNavbar = () => {
  return (
    <AppBar position="static" className="container" color="white" elevation={1}>
      <Container maxWidth="lg">
        <Barsesion></Barsesion>
      </Container>
    </AppBar>
  );
};

export default AppNavbar;
