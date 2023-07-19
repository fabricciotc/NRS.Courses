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
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [usuario, setUsuario] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    username: "",
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

  useEffect(() => {
    if (sesionUsuario) {
      setUsuario(sesionUsuario.usuario);
      setUsuario((anterior) => ({
        ...anterior,
        fotoUrl: sesionUsuario.usuario.imagenPerfil,
        imagenPerfil: null,
      }));
    }
  }, []);

  const guardarUsuario = (e) => {
    e.preventDefault();
    actulizarUsuario(usuario, dispatch).then((res) => {
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
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Avatar
                item
                xs={12}
                md={12}
                style={style.avatar}
                src={usuario ? usuario.fotoUrl || reactFoto : null}
              ></Avatar>

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
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom={true}>
                Datos del Usuario
              </Typography>
              <Typography gutterBottom={true} variant="string" paragraph={true}>
                ¡Bienvenido a tu página de perfil de usuario! Aquí podrás ver y
                actualizar toda tu información personal. Toma el control y
                mantén tus datos actualizados para asegurarte de que siempre
                tengamos la información correcta.
              </Typography>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  name="nombreCompleto"
                  value={usuario.nombreCompleto}
                  onChange={ingresarValoresMemoria}
                  label="Ingrese su Nombre y Apellidos"
                  variant="outlined"
                ></TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  name="email"
                  value={usuario.email}
                  margin="normal"
                  onChange={ingresarValoresMemoria}
                  label="Ingrese su Email"
                  variant="outlined"
                ></TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  name="username"
                  margin="normal"
                  value={usuario.username}
                  onChange={ingresarValoresMemoria}
                  label="Ingrese su Username"
                  variant="outlined"
                ></TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="password"
                  value={usuario.password}
                  onChange={ingresarValoresMemoria}
                  autoComplete="new-password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  label="Ingrese password"
                />
              </Grid>
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
