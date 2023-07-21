import {
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import style from "../tools/Style";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import NotFoundIcon from "../../assets/images/person-error-404-desktop.svg";

const NotFound = (props) => {
  return (
    <Grid container style={style.authBackground}>
      <Container maxWidth="xs" style={style.centered}>
        <Card>
          <CardContent>
            <div style={style.paper}>
              <img
                src={NotFoundIcon}
                style={style.loginIcon}
                alt="Login logo"
              />
              <Typography variant="h4" gutterBottom={true}>
                404
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
};

export default withRouter(NotFound);
