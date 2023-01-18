import { Container, Avatar, Typography, TextField,Button } from '@material-ui/core';
import React, { useState } from 'react';
import style from '../tools/Style';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { loginUsuario } from '../../actions/UsuarioAction';
const Login = () => {

    const[usuario,setUsuario]=useState({
        Email:'',
        Password:''
    })

    const ingresarValoresMemoria = e=>{
        const {name,value} =e.target;
        setUsuario(anterior=>({
            ...anterior,
            [name]:value
        }));

    }

    const loginUsuarioBtn = e=>{
        e.preventDefault();
        loginUsuario(usuario).then(d=>{
            window.localStorage.setItem("tokenSeguridad",d.data.token);
        });
    }

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
                <TextField variant="outlined" name="Email" value={usuario.Email} margin="normal" label="Ingrese Email" onChange={ingresarValoresMemoria} fullWidth></TextField>
                <TextField type="password" name="Password" margin="normal" value={usuario.Password} variant="outlined" label="Ingrese su Password" onChange={ingresarValoresMemoria} fullWidth></TextField>
                <Button stype="submit" onClick={loginUsuarioBtn} fullWidth variant="contained" color="primary" style={style.submit}>Enviar</Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;