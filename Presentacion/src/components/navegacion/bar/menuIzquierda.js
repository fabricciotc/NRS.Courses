import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export const MenuIzquierda = ({ classes }) => (
  <div className={classes.list}>
    <List>
      <ListItem component={Link} button to="/auth/perfil">
        <i className="material-icons">account_box</i>
        <ListItemText
          classes={{ primary: classes.ListItemText }}
          primary="Perfil"
        ></ListItemText>
      </ListItem>
    </List>
    <Divider></Divider>
    <List>
      <ListItem component={Link} button to="/curso/nuevo">
        <i className="material-icons">add_box</i>
        <ListItemText
          classes={{ primary: classes.ListItemText }}
          primary="Nuevo Curso"
        ></ListItemText>
      </ListItem>
      <ListItem component={Link} button to="/curso/lista">
        <i className="material-icons">menu_book</i>
        <ListItemText
          classes={{ primary: classes.ListItemText }}
          primary="Lista Cursos"
        ></ListItemText>
      </ListItem>
    </List>
    <Divider></Divider>
    <List>
      <ListItem component={Link} button to="/instructor/nuevo">
        <i className="material-icons">person_add</i>
        <ListItemText
          classes={{ primary: classes.ListItemText }}
          primary="Nuevo Instructor"
        ></ListItemText>
      </ListItem>
      <ListItem component={Link} button to="/instructor/lista">
        <i className="material-icons">people</i>
        <ListItemText
          classes={{ primary: classes.ListItemText }}
          primary="Lista Instructores"
        ></ListItemText>
      </ListItem>
    </List>
  </div>
);
