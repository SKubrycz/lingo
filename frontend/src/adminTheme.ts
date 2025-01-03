import { createTheme } from "@mui/material/styles";

const adminThemePalette = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgb(100, 149, 237)",
      dark: "rgb(0, 7, 20)",
      contrastText: "rgb(245, 248, 255)",
    },
    secondary: {
      main: "rgb(138, 168, 222)",
    },
    contrastThreshold: 4.5,
  },

  typography: {
    fontFamily: "Fira Sans, sans-serif",
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

export const adminTheme = createTheme(adminThemePalette, {
  palette: {
    background: {
      paper: adminThemePalette.palette.primary.dark,
    },
  },
});
