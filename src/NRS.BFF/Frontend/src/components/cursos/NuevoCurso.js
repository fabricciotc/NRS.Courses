import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import style from "../tools/Style";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ImageUploader from "react-images-upload";
import { v4 as uuidv4 } from "uuid";
import { obtenerDataImagen } from "../../actions/ImagenAction";
import { guardarCurso } from "../../actions/CursoAction";
import { useStateValue } from "../../context/storage";

const NuevoCurso = () => {
  const [sesionUsuario, dispatch] = useStateValue();
  const [imagenCurso, setImagenCurso] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [curso, setCurso] = useState({
    titulo: "",
    descripcion: "",
    precio: 0.0,
    precioPromocion: 0.0,
  });

  const guardarCursoBoton = (e) => {
    e.preventDefault();
    const cursoId = uuidv4();
    const objetoCurso = {
      cursoId: cursoId,
      titulo: curso.titulo,
      descripcion: curso.descripcion,
      precio: parseFloat(curso.precio || 0.0),
      promocion: parseFloat(curso.precioPromocion || 0.0),
      fechaPublicacion: fechaSeleccionada,
    };

    let objetoImagen = null;

    if (imagenCurso) {
      objetoImagen = {
        nombre: imagenCurso.nombre,
        data: imagenCurso.data,
        extension: imagenCurso.extension,
        objetoReferencia: cursoId,
      };
    }

    guardarCurso(objetoCurso, objetoImagen).then((respuestas) => {
      const responseCurso = respuestas[0];
      const responseImagen = respuestas[1];
      let mensaje = "";

      if (responseCurso.status === 200) {
        mensaje += "Se guardo exitosamente el curso";
      } else {
        mensaje += "Errores: " + Object.keys(responseCurso.data.errors);
      }
      if (responseImagen) {
        if (responseImagen.status === 200) {
          mensaje += ", Se guardo la imagen correctamente";
        } else {
          mensaje +=
            ", Errores en imagen: " + Object.keys(responseImagen.data.errors);
        }
      }
      dispatch({
        type: "OPEN_SNACKBAR",
        openMensaje: {
          open: true,
          mensaje: mensaje,
        },
      });
    });
  };

  const subirFoto = (imagenes) => {
    const foto = imagenes[0];
    obtenerDataImagen(foto).then((respuesta) => {
      setImagenCurso(respuesta);
    });
  };

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setCurso((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const fotoKey = uuidv4();
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Registro de Nuevo Curso
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="titulo"
                variant="outlined"
                fullWidth
                label="Ingrese Titulo"
                value={curso.titulo}
                onChange={ingresarValoresMemoria}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="descripcion"
                variant="outlined"
                fullWidth
                label="Ingrese Descripcion"
                value={curso.descripcion}
                onChange={ingresarValoresMemoria}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="precio"
                variant="outlined"
                fullWidth
                label="Ingrese Precio"
                value={curso.precio}
                onChange={ingresarValoresMemoria}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="precioPromocion"
                variant="outlined"
                fullWidth
                label="Ingrese Precio Promoción"
                value={curso.precioPromocion}
                onChange={ingresarValoresMemoria}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  value={fechaSeleccionada}
                  onChange={setFechaSeleccionada}
                  margin="normal"
                  id="fecha-publicacion.id"
                  label="Seleccion Fecha de Publicación"
                  format="dd/MM//yyyy"
                  fullWidth
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                ></KeyboardDatePicker>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <ImageUploader
                withIcon={false}
                key={fotoKey}
                singleImage={true}
                buttonText="Seleccionar Imagen del Curso"
                onChange={subirFoto}
                imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
                maxFileSize={5242880}
              ></ImageUploader>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                style={style.submit}
                onClick={guardarCursoBoton}
              >
                Guardar Curso
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default NuevoCurso;
