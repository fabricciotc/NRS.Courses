import { AppBar, Container } from "@material-ui/core";
import React from "react";
import Barsesion from "./bar/Barsesion";
import { useStateValue } from "../../context/storage";
import style from "../tools/Style";

const AppNavbar = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();

  return sesionUsuario ? (
    sesionUsuario.autenticado == true ? (
      <AppBar
        position="static"
        className="container"
        color="white"
        elevation={1}
        style={style.appBar}
      >
        <Container maxWidth="lg">
          <Barsesion></Barsesion>
        </Container>
      </AppBar>
    ) : null
  ) : null;
};

export default AppNavbar;
