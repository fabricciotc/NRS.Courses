const initialState = {
  open: false,
  mensaje: "",
  severity: null,
};

const openSnackBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_SNACKBAR":
      return {
        ...state,
        open: action.openMensaje.open,
        mensaje: action.openMensaje.mensaje,
        severity: action.openMensaje.severity,
      };
    default:
      return state;
  }
};

export default openSnackBarReducer;
