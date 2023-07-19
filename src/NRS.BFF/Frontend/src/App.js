import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import Login from "./components/security/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Grid, Snackbar } from "@material-ui/core";
import Registro from "./components/security/Registro";
import PerfilUsuario from "./components/security/PerfilUsuario";
import AppNavbar from "./components/navegacion/AppNavbar";
import { useStateValue } from "./context/storage";
import { useEffect, useState } from "react";
import { obtenerUsuarioActual } from "./actions/UsuarioAction";
import Alert from "@material-ui/lab/Alert";
import ProtectedRoute from "./components/navegacion/bar/ProtectedRoute";
import style from "./components/tools/Style";

const App = () => {
  const [{ sesionUsuario, openSnackBar }, dispatch] = useStateValue();
  const [iniciaApp, setInicialApp] = useState(false);

  useEffect(() => {
    if (!iniciaApp) {
      obtenerUsuarioActual(dispatch)
        .then((response) => {
          setInicialApp(true);
        })
        .catch((err) => {
          setInicialApp(true);
        });
    }
  }, [iniciaApp, dispatch]);

  const handleClose = () =>
    dispatch({
      type: "OPEN_SNACKBAR",
      openMensaje: {
        open: false,
      },
    });
  return iniciaApp === false ? null : (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openSnackBar ? openSnackBar.open : false}
        autoHideDuration={3000}
        ContentProps={{ "aria-describedby": "message-id" }}
        onClose={handleClose}
      >
        <Alert
          severity={
            openSnackBar
              ? openSnackBar.severity
                ? openSnackBar.severity
                : "info"
              : "info"
          }
          onClose={handleClose}
        >
          <span id="message-id">
            {openSnackBar ? openSnackBar.mensaje : ""}
          </span>
        </Alert>
      </Snackbar>
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppNavbar></AppNavbar>
          <Grid container style={style.mainContainer}>
            <Container maxWidth="lg">
              <Switch>
                <Route exact path="/auth/login" component={Login} />
                <Route exact path="/auth/registrar" component={Registro} />
                <ProtectedRoute
                  exact
                  path="/auth/perfil"
                  component={PerfilUsuario}
                />
                <ProtectedRoute exact path="/" component={PerfilUsuario} />
              </Switch>
            </Container>
          </Grid>
        </MuiThemeProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;
