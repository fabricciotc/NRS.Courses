import { List, ListItem, Avatar, ListItemText } from "@material-ui/core";
import React from "react";
import FotoUsuarioTheme from "../../../logo.svg";
import { Link } from "react-router-dom";

export const MenuDerecha = ({ classes, usuario, salirSesion }) => (
  <div className={classes.list}>
    <List>
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
    </List>
  </div>
);
