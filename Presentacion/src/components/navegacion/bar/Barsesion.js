import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useStateValue } from "../../../context/storage";
import FotoUsuarioTheme from "../../../logo.svg";
import { MenuIzquierda } from "./menuIzquierda";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { MenuDerecha } from "./menuDerecha";

const useStyles = makeStyles((theme) => ({
  seccionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  seccionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: "1",
  },
  avatarSize: {
    width: 40,
    height: 40,
  },
  list: {
    width: 250,
  },
  listItemText: {
    fontSize: "14px",
    fontWeight: 600,
    paddingLeft: "15",
    color: "#212121",
  },
}));

const Barsesion = (props) => {
  const classes = useStyles();
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [abrirMenuIzquierdo, setAbrirmenuIzquierda] = useState(false);
  const [abrirMenuDerecha, setAbrirmenuDerecha] = useState(false);

  const cerrarMenuIzquierdo = () => {
    setAbrirmenuIzquierda(false);
  };
  const abrirMenuIzquierdoAction = () => {
    setAbrirmenuIzquierda(true);
  };
  const abrirMenuDerechaAction = () => {
    setAbrirmenuDerecha(true);
  };
  const cerrarMenuDerecha = () => {
    setAbrirmenuDerecha(false);
  };
  const salirSesionApp = () => {
    dispatch({
      type: "CERRAR_SESION",
    });
    localStorage.removeItem("tokenSeguridad");
    props.history.push("/auth/login");
  };
  const loginApp = () => {
    props.history.push("/auth/login");
  };
  const registroApp = () => {
    props.history.push("/auth/registrar");
  };

  return (
    <React.Fragment>
      <Drawer
        open={abrirMenuIzquierdo}
        onClose={cerrarMenuIzquierdo}
        anchor="left"
      >
        <div
          className={classes.list}
          onKeyDown={cerrarMenuIzquierdo}
          onClick={cerrarMenuIzquierdo}
        >
          <MenuIzquierda classes={classes}></MenuIzquierda>
        </div>
      </Drawer>

      <Drawer
        open={abrirMenuDerecha}
        onClose={cerrarMenuDerecha}
        anchor="right"
      >
        <div
          role="button"
          onClick={cerrarMenuDerecha}
          onKeyDown={cerrarMenuDerecha}
        >
          <MenuDerecha
            classes={classes}
            salirSesion={salirSesionApp}
            usuario={sesionUsuario ? sesionUsuario.usuario : null}
            loginApp={loginApp}
            registroApp={registroApp}
          />
        </div>
      </Drawer>

      <Toolbar>
        {sesionUsuario ? (
          sesionUsuario.usuario ? (
            <IconButton color="inherit" onClick={abrirMenuIzquierdoAction}>
              <i className="material-icons">menu</i>
            </IconButton>
          ) : null
        ) : null}
        <Typography variant="h6">Cursos Online</Typography>
        <div className={classes.grow}></div>
        <div className={classes.seccionDesktop}>
          {sesionUsuario ? (
            sesionUsuario.usuario ? (
              <>
                <Button color="inherit" onClick={salirSesionApp}>
                  Salir
                </Button>

                <Button color="inherit">
                  {sesionUsuario.usuario.nombreCompleto}
                </Button>
                <Avatar src={FotoUsuarioTheme}></Avatar>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={loginApp}>
                  Login
                </Button>
                <Button color="inherit" onClick={registroApp}>
                  Registro
                </Button>
              </>
            )
          ) : (
            <>
              <Button color="inherit" onClick={loginApp}>
                Login
              </Button>
              <Button color="inherit" onClick={registroApp}>
                Registro
              </Button>
            </>
          )}
        </div>

        <div className={classes.seccionMobile}>
          <IconButton color="inherit" onClick={abrirMenuDerechaAction}>
            <i className="material-icons">more_vert</i>
          </IconButton>
        </div>
      </Toolbar>
    </React.Fragment>
  );
};

export default withRouter(Barsesion);
