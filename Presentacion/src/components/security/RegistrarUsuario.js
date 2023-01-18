import { Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import style from "../tools/Style";
import {useState} from 'react'
import {registrarUsuario} from '../../actions/UsuarioAction';

// sm = DESKTOP
// md = TABLET
// xs = MOBILE

const RegistrarUsuario = () =>{
    const[usuario,setUsuario]= useState({
        NombreCompleto:'',
        Email:'',
        Password:'',
        Username:'',
        ConfirmarPassword:''
    });
    const ingresarValoresMemoria = e =>{
        const {name,value} = e.target;
        setUsuario(anterior=>({
            ...anterior,
            [name] : value
        }));
    }
    const enviarRegistro=e=>{
        e.preventDefault();
        console.log("Enviando...", usuario);
        registrarUsuario(usuario).then(response => {
            console.log("Se registro exitosamente el usuario",response)
            window.localStorage.setItem("tokenSeguridad",response.data.token);
        });
    }


    return(
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h5">
                    Registro de Usuario
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField name="NombreCompleto" value={usuario.NombreCompleto} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese su Nombre Completo"></TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="Email" variant="outlined" value={usuario.Email} onChange={ingresarValoresMemoria} fullWidth label="Ingrese su Email"></TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="Username" variant="outlined" value={usuario.Username} onChange={ingresarValoresMemoria} fullWidth label="Ingrese su Username"></TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="Password" variant="outlined" value={usuario.Password} onChange={ingresarValoresMemoria} fullWidth label="Ingrese su Contraseña" type="password"></TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="ConfirmarPassword" value={usuario.ConfirmarPassword} variant="outlined" onChange={ingresarValoresMemoria} fullWidth label="Confirme su Contraseña" type="password"></TextField>
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            <Button onClick={enviarRegistro} fullWidth type="button" variant="contained" color="primary" size="large" style={style.submit}>Enviar</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
export default RegistrarUsuario;