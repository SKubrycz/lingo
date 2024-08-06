import { createTheme } from "@mui/material/styles";

const navbarFontColor: string = '#fff0e6';

const defaultThemePalette = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "rgb(230, 92, 0)",
      },
      secondary: {
        main: "#c64000",
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
  }});

export const defaultTheme = createTheme(defaultThemePalette, {
  palette: {
    background: {
      paper: defaultThemePalette.palette.primary.main,
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: defaultThemePalette.palette.primary.main,
      },
    },
  },
}
);