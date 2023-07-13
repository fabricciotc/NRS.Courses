import { AppBar } from "@material-ui/core";
import React from "react";
import Barsesion from "./bar/Barsesion";
import { useStateValue } from "../../context/storage";

const AppNavbar = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();

  return sesionUsuario ? (
    sesionUsuario.autenticado ? (
      <AppBar position="static">
        <Barsesion></Barsesion>
      </AppBar>
    ) : null
  ) : null;
};

export default AppNavbar;
