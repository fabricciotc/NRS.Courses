import HttpCliente from '../services/HttpCliente';
import axios from 'axios';
// Instancia solo lo creamos y usamos para Registro y Login, ya que no tenemos TOKEN en esos eventos
const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const registrarUsuario = (usuario) =>{
   return new Promise((resolve,eject)=>{
        instancia.post('/usuario/registrar',usuario).then(response =>{
            resolve(response);
        })
    })
}
export const obtenerUsuarioActual = (dispatch)=>{
    return new Promise((resolve,eject)=>{
        HttpCliente.get('/usuario').then(response=>{
            dispatch({
                type:"INICIAR_SESION",
                sesion:response.data,
                autenticado:true
            })
            resolve(response);
        }).catch(error=>{
            resolve(error.response);
        });
    });
}
export const actulizarUsuario= (usuario)=>{
    return new Promise((resolve, eject)=>{
        HttpCliente.put("/usuario",usuario).then(res=>{
            resolve(res);
        }).catch(error=>{
            resolve(error.response);
        });
    });
}
export const loginUsuario = (usuario)=>{
    return new Promise((resolve, eject)=>{
        instancia.post("/usuario/login",usuario).then(res=>{
            resolve(res);
        });
    });
}