import { List, ListItem, Avatar, ListItemText } from "@material-ui/core";
import React from "react";
import FotoUsuarioTheme from "../../../logo.svg";
import { Link } from "react-router-dom";

export const MenuDerecha = ({
  classes,
  usuario,
  salirSesion,
  loginApp,
  registroApp,
}) => (
  <div className={classes.list}>
    <List>
      {usuario ? (
        <>
          <ListItem button component={Link}>
            <Avatar src={usuario ? usuario.foto || FotoUsuarioTheme : null} />
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={usuario ? usuario.nombreCompleto : null}
            ></ListItemText>
          </ListItem>
          <ListItem button component={Link}>
            <ListItemText button onClick={salirSesion}>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Salir"
              ></ListItemText>
            </ListItemText>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem button component={Link}>
            <ListItemText button onClick={loginApp}>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Login"
              ></ListItemText>
            </ListItemText>
          </ListItem>
          <ListItem button component={Link}>
            <ListItemText button onClick={registroApp}>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Registro"
              ></ListItemText>
            </ListItemText>
          </ListItem>
        </>
      )}
    </List>
  </div>
);
