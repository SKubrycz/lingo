import { createTheme } from "@mui/material/styles";

const defaultThemePalette = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgb(253, 229, 210)", //"rgb(230, 92, 0)",
      contrastText: "rgb(230, 92, 0)",
    },
    secondary: {
      main: "rgb(204, 153, 119)", //"#c64000",
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

export const defaultTheme = createTheme(defaultThemePalette, {
  palette: {
    background: {
      paper: defaultThemePalette.palette.primary.dark,
    },
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: defaultThemePalette.palette.primary.dark,
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          label: {
            "&.Mui-focused": {
              color: defaultThemePalette.palette.primary.contrastText,
            },
          },
        },
      },
    },

    MuiInput: {
      styleOverrides: {
        root: {
          "&::after": {
            borderBottom: `2px solid ${defaultThemePalette.palette.primary.contrastText}`,
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {},
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {},
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          color: defaultThemePalette.palette.primary.main,
          //backgroundColor: defaultThemePalette.palette.primary.contrastText,

          //later to be examined/edited/removed
          '&:is([variant="text"], [variant="outlined"])': {
            color: defaultThemePalette.palette.primary.contrastText,
          },
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255, 246, 240)",
        },
        bar: {
          backgroundColor: defaultThemePalette.palette.primary.contrastText,
        },
      },
    },
  },
});
