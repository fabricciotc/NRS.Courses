import { AppBar } from "@material-ui/core";
import React from "react";
import Barsesion from "./bar/Barsesion";

const AppNavbar = () => {
  return (
    <AppBar position="static">
      <Barsesion></Barsesion>
    </AppBar>
  );
};

export default AppNavbar;
