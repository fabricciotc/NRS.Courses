import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  actulizarUsuario,
  obtenerUsuarioActual,
} from "../../actions/UsuarioAction";
import style from "../tools/Style";
import { useStateValue } from "../../context/storage";

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    confirmarPassword: "",
    userName: "",
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const [{ sesionUsuario }, dispatch] = useStateValue();

  useEffect(() => {
    obtenerUsuarioActual(dispatch).then((res) => {
      setUsuario(res.data);
    });
  }, []);

  const guardarUsuario = (e) => {
    e.preventDefault();
    actulizarUsuario(usuario).then((res) => {
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Se guardaron exitosamente los cambios en perfil usuario",
          },
        });
        window.localStorage.setItem("tokenSeguridad", res.data.token);
      } else if (res.status === 500) {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: res.data,
          },
        });
        window.localStorage.setItem("tokenSeguridad", res.data.token);
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje:
              "No se pudieron guardar los cambios en: " +
              Object.keys(res.data.errors),
          },
        });
      }
    });
  };

  return (
    <Container maxWidth="md" component="main" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Perfil de Usuario
        </Typography>
      </div>
      <form style={style.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              name="nombreCompleto"
              value={usuario.nombreCompleto}
              onChange={ingresarValoresMemoria}
              label="Ingrese su Nombre y Apellidos"
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="email"
              value={usuario.email}
              onChange={ingresarValoresMemoria}
              label="Ingrese su Email"
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="userName"
              value={usuario.username}
              onChange={ingresarValoresMemoria}
              label="Ingrese su Username"
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="password"
              value={usuario.password}
              label="Ingrese su Password"
              onChange={ingresarValoresMemoria}
              variant="outlined"
              type="password"
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="confirmarPassword"
              value={usuario.confirmarPassword}
              label="Confirme su Password"
              variant="outlined"
              onChange={ingresarValoresMemoria}
              type="password"
            ></TextField>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onChange={ingresarValoresMemoria}
            size="large"
            style={style.submit}
            onClick={guardarUsuario}
            type="submit"
          >
            Guardar Datos
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default PerfilUsuario;
