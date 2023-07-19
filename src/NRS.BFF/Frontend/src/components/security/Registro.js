import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";
import style from "../tools/Style";
import { useState } from "react";
import { registrarUsuario } from "../../actions/UsuarioAction";
import { useStateValue } from "../../context/storage";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import SignUp from "../../assets/images/banner-registro.png";

// sm = DESKTOP
// md = TABLET
// xs = MOBILE

const Registro = (props) => {
  const [usuario, setUsuario] = useState({
    NombreCompleto: "",
    Email: "",
    Password: "",
    Username: "",
    ConfirmarPassword: "",
  });
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const [{ sesionUsuario }, dispatch] = useStateValue();

  const enviarRegistro = (e) => {
    e.preventDefault();
    registrarUsuario(usuario, dispatch).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem("tokenSeguridad", response.data.token);
      } else if (response.status === 401) {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "(LGE401) " + response.data.mensaje,
            severity: "error",
          },
        });
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: `(LGE${response.status}): ${response.statusText}`,
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
              <img
                src={SignUp}
                style={style.registroIcon}
                alt="Registro logo"
              />
              <form style={style.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      name="NombreCompleto"
                      value={usuario.NombreCompleto}
                      onChange={ingresarValoresMemoria}
                      variant="outlined"
                      fullWidth
                      label="Fullname"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="Email"
                      variant="outlined"
                      value={usuario.Email}
                      onChange={ingresarValoresMemoria}
                      fullWidth
                      label="Email"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="Username"
                      variant="outlined"
                      value={usuario.Username}
                      onChange={ingresarValoresMemoria}
                      fullWidth
                      label="Username"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      name="Password"
                      variant="outlined"
                      value={usuario.Password}
                      onChange={ingresarValoresMemoria}
                      fullWidth
                      label="Password"
                      type="password"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      name="ConfirmarPassword"
                      value={usuario.ConfirmarPassword}
                      variant="outlined"
                      onChange={ingresarValoresMemoria}
                      fullWidth
                      label="Confirm Password"
                      type="password"
                    ></TextField>
                  </Grid>
                </Grid>
                <Grid container justify="center">
                  <Grid item xs={12} md={12}>
                    <Button
                      stype="submit"
                      onClick={enviarRegistro}
                      fullWidth
                      variant="contained"
                      disableElevation
                      color="primary"
                      style={style.submit}
                    >
                      SIGN UP
                    </Button>
                    <Button
                      stype="submit"
                      onClick={() => {
                        props.history.push("/auth/login");
                      }}
                      fullWidth
                      variant="outlined"
                      color="primary"
                      style={style.submit}
                    >
                      SIGN IN
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
};
export default withRouter(Registro);
