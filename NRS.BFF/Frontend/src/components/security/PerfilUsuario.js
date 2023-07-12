import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { actulizarUsuario } from "../../actions/UsuarioAction";
import style from "../tools/Style";
import { useStateValue } from "../../context/storage";
import reactFoto from "../../logo.svg";
import { v4 as uuidv4 } from "uuid";
import ImageUploader from "react-images-upload";
import { obtenerDataImagen } from "../../actions/ImagenAction";

const PerfilUsuario = (props) => {
  const [usuario, setUsuario] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    confirmarPassword: "",
    userName: "",
    imagenPerfil: null,
    fotoUrl: "",
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
    if (sesionUsuario != null) {
      setUsuario(sesionUsuario.usuario);
      setUsuario((anterior) => ({
        ...anterior,
        fotoUrl: sesionUsuario.usuario.imagenPerfil,
      }));
    }
  }, [sesionUsuario]);

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

  const subitFoto = (imagenes) => {
    const foto = imagenes[0];
    const fotoUrl = URL.createObjectURL(foto);

    obtenerDataImagen(foto).then((respuesta) => {
      setUsuario((anterior) => ({
        ...anterior,
        imagenPerfil: respuesta,
        fotoUrl: fotoUrl,
      }));
    });
  };

  const fotoKey = uuidv4();

  return (
    <Container maxWidth="md" component="main" justify="center">
      <div style={style.paper}>
        <Avatar
          style={style.avatar}
          src={usuario.fotoUrl || reactFoto}
        ></Avatar>
        <Typography component="h1" variant="h5">
          Perfil de Usuario
        </Typography>

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
                name="username"
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
            <Grid item xs={12} md={12}>
              <ImageUploader
                withIcon={false}
                key={fotoKey}
                singleImage={true}
                buttonText="Seleccione una Imagen de Perfil"
                onChange={subitFoto}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                maxFileSize={5242880}
              ></ImageUploader>
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
      </div>
    </Container>
  );
};

export default PerfilUsuario;
