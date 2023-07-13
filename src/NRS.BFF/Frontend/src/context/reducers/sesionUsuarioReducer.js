export const initialState = {
    usuario:{
        nombreCompleto:'',
        email:'',
        userName:'',
        foto:''
    },
    autenticado:false
};

const sesionUsuarioReducer = (state = initialState,action) =>{
    switch (action.type) {
        case "INICIAR_SESION":
            return {
                ...state,
                usuario:action.sesion,
                autenticado:action.autenticado
            };
        case "CERRAR_SESION":
            return{
                ...state,
                usuario:action.nuevoUsuario,
                autenticado:action.autenticado
            };
        case "ACTULIZAR_USUARIO":
            return{
                ...state,
                usuario:action.nuevoUsuario,
                autenticado:action.autenticado
            };
        default: return state;
    }
};

export default sesionUsuarioReducer;