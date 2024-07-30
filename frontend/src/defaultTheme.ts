import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "rgb(230, 92, 0)",
      },
    },
    typography: {
      fontFamily: "Fira Sans",
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            margin: ".5em",
          },
        },
      },
    },
  });