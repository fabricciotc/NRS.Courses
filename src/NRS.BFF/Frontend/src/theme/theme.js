import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#05be50",
      main: "#05be50",
      dark: "#05be50",
      contrastText: "#ECFAD8",
    },
    danger: {
      light: "red",
      main: "red",
      dark: "red",
      contrastText: "red",
    },
  },
});
export default theme;
