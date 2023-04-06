import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import style from "../tools/Style";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { loginUsuario } from "../../actions/UsuarioAction";
import { useStateValue } from "../../context/storage";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
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
    loginUsuario(usuario).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Inicio de sesion exitoso",
          },
        });
        dispatch({
          type: "INICIAR_SESION",
          openMensaje: {
            usuario: {
              nombreCompleto: res.data.nombreCompleto,
              email: res.data.email,
              userName: res.data.username,
              foto: res.data.imagen,
            },
            autenticado: true,
          },
        });
        window.localStorage.setItem("tokenSeguridad", res.data.token);
        props.history.push("/auth/perfil");
      } else if (res.status === 401) {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "(LGE301) " + res.data.mensaje,
            severity: "error",
          },
        });
      }
    });
  };

  return (
    <Container maxWidth="xs">
      <div style={style.paper}>
        <Avatar style={style.avatar}>
          <LockOutlinedIcon style={style.icon}></LockOutlinedIcon>
        </Avatar>
        <Typography component="h1" variant="h5">
          Login de Usuario
        </Typography>
        <form style={style.form}>
          <TextField
            variant="outlined"
            name="Email"
            value={usuario.Email}
            margin="normal"
            label="Ingrese Email"
            onChange={ingresarValoresMemoria}
            fullWidth
          ></TextField>
          <TextField
            type="password"
            name="Password"
            margin="normal"
            value={usuario.Password}
            variant="outlined"
            label="Ingrese su Password"
            onChange={ingresarValoresMemoria}
            fullWidth
          ></TextField>
          <Button
            stype="submit"
            onClick={loginUsuarioBtn}
            fullWidth
            variant="contained"
            color="primary"
            style={style.submit}
          >
            Enviar
          </Button>
          <Button
            stype="submit"
            onClick={() => {
              props.history.push("/auth/registrar");
            }}
            fullWidth
            variant="contained"
            color="danger"
            style={style.submit}
          >
            Registrarse
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(Login);
