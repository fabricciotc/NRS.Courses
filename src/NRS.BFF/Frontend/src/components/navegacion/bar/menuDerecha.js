import {
  List,
  ListItem,
  Avatar,
  ListItemText,
  Button,
} from "@material-ui/core";
import React from "react";
import FotoUsuarioTheme from "../../../logo.svg";
import { Link } from "react-router-dom";
import style from "../../tools/Style";

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
            <Avatar
              style={style.avatarRight}
              src={usuario ? usuario.fotoUrl || FotoUsuarioTheme : null}
            />
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={usuario ? usuario.nombreCompleto : null}
            ></ListItemText>
          </ListItem>
          <ListItem button component={Link}>
            <Button
              color="secondary"
              variant="contained"
              disableElevation
              onClick={salirSesion}
              style={{ width: "100%" }}
            >
              Salir
            </Button>
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
