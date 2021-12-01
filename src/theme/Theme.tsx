// import { createMuiTheme } from "@mui/material";

import { createTheme } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";
export const theme = createTheme({
  palette: {
    secondary: {
      main: "#64dd17",
      light: "#83e345",
      dark: "#469a10",
    },
    primary: {
      main: indigo[500],
      light: indigo[400],
      dark: indigo[800],
    },
  },
  typography: {
    fontFamily: "Roboto",
    body2: {
      fontFamily: "Times New Roman",
      fontSize: "1rem",
    },
  },
  overrides: {},
  shape: {
    borderRadius: 10,
  },
});
