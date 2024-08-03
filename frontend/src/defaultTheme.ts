import { createTheme } from "@mui/material/styles";

const defaultThemePalette = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#e65c00",
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
      paper: defaultThemePalette.palette.primary.light,
    },
  },
}
);