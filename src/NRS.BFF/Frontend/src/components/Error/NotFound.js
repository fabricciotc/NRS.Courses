import {
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
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
              <div style={style.notFoundContainer}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Page Not Found
                </Typography>
                <img
                  src={NotFoundIcon}
                  style={style.notFoundIcon}
                  alt="Login logo"
                />

                <Typography color="textSecondary">
                  The page you are looking for does not exist.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    props.history.push("/");
                  }}
                >
                  Go Back Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
};

export default withRouter(NotFound);
