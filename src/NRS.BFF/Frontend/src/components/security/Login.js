import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core";
import React, { useState } from "react";
import style from "../tools/Style";
import { loginUsuario } from "../../actions/UsuarioAction";
import { useStateValue } from "../../context/storage";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import SignIn from "../../assets/images/banner-login.png";

const Login = (props) => {
  const [usuario, setUsuario] = useState({
    Email: "",
    Password: "",
  });

  const [{ sesionUsuario }, dispatch] = useStateValue();

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const loginUsuarioBtn = (e) => {
    e.preventDefault();
    loginUsuario(usuario, dispatch).then((res) => {
      if (res.status === 200) {
        window.localStorage.setItem("tokenSeguridad", res.data.token);
        props.history.push("/auth/perfil");
      } else if (res.status === 401) {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "(LGE401) " + res.data.mensaje,
            severity: "error",
          },
        });
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: `(LGE${res.status}): ${res.statusText}`,
            severity: "error",
          },
        });
      }
    });
  };

  return (
    <Grid container style={style.authBackground}>
      <Container maxWidth="xs" style={style.centered}>
        <Card>
          <CardContent>
            <div style={style.paper}>
              <img src={SignIn} style={style.loginIcon} alt="Login logo" />
              <form style={style.form}>
                <TextField
                  variant="outlined"
                  name="Email"
                  value={usuario.Email}
                  margin="normal"
                  label="Email"
                  onChange={ingresarValoresMemoria}
                  fullWidth
                ></TextField>
                <TextField
                  type="password"
                  name="Password"
                  margin="normal"
                  value={usuario.Password}
                  variant="outlined"
                  label="Password"
                  onChange={ingresarValoresMemoria}
                  fullWidth
                ></TextField>
                <Button
                  stype="submit"
                  onClick={loginUsuarioBtn}
                  fullWidth
                  variant="contained"
                  disableElevation
                  color="primary"
                  style={style.submit}
                >
                  SIGN IN
                </Button>
                <Button
                  stype="submit"
                  onClick={() => {
                    props.history.push("/auth/registrar");
                  }}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  style={style.submit}
                >
                  SIGN UP
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
};

export default withRouter(Login);
