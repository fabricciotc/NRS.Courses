import React from 'react';
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import Login from "./components/security/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid ,Snackbar} from "@material-ui/core";
import RegistrarUsuario from "./components/security/RegistrarUsuario";
import PerfilUsuario from "./components/security/PerfilUsuario";
import AppNavbar from "./components/navegacion/AppNavbar";
import { useStateValue } from "./context/storage";
import { useEffect, useState } from "react";
import { obtenerUsuarioActual } from "./actions/UsuarioAction";

const App = () => {
  const [{sesionUsuario,openSnackBar},dispatch]=useStateValue();
  const [iniciaApp,setInicialApp]=useState(false);

  useEffect(()=>{
    if(!iniciaApp){
      obtenerUsuarioActual(dispatch).then(response=>{
        setInicialApp(true);
      }).catch(err=>{
        setInicialApp(true);
      })
    }
  },[iniciaApp])

  return (
    <React.Fragment>
      <Snackbar anchorOrigin={
        {
          vertical:"bottom",horizontal:"center"
        }
      } open={openSnackBar?openSnackBar.open:false}
      autoHideDuration={3000} ContentProps={{"aria-describedby":"message-id"}}
      message={
        <span id="message-id">
          {openSnackBar?openSnackBar.mensaje:''}
        </span>
      } onClose={()=> dispatch({
        type:'OPEN_SNACKBAR',
        openMensaje:{
          open:false,
          mensaje:''
        }
      })}
      ></Snackbar>
    <Router>
      <MuiThemeProvider theme={theme}>
        <AppNavbar></AppNavbar>
        <Grid container>
          <Switch>
          <Route exact path="/auth/login" component={Login}/>
          <Route exact path="/auth/registrar" component={RegistrarUsuario}/>
          <Route exact path="/auth/perfil" component={PerfilUsuario}/>
          <Route exact path="/" component={PerfilUsuario}/>
          </Switch>
        </Grid>
      </MuiThemeProvider>
    </Router>
    </React.Fragment>
  );
};

export default App;
