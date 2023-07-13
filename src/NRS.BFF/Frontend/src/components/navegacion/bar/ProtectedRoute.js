import React from "react";
import { useStateValue } from "../../../context/storage";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";

function ProtectedRoute({ component: Component, ...rest }) {
  const [{ sesionUsuario }, dispatch] = useStateValue();

  return (
    <Route
      {...rest}
      render={(props) =>
        sesionUsuario ? (
          sesionUsuario.autenticado === true ? (
            <Component {...props} {...rest}></Component>
          ) : (
            <Redirect to="/auth/login"></Redirect>
          )
        ) : (
          <Redirect to="/auth/login"></Redirect>
        )
      }
    />
  );
}
export default ProtectedRoute;
