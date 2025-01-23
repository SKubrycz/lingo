import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import Language from "./Language";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

interface NavbarProps {
  link: string[];
  options: string[];
  tooltip: string | null;
  dialog?: any | null;
  languages: string[] | null;
}

function Navbar({ link, options, tooltip, dialog, languages }: NavbarProps) {
  const languageData = useSelector((state: RootState) => state.languageReducer);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <AppBar component="nav" position="fixed" elevation={trigger ? 4 : 0}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              display: "block",
              fontFamily: "Fira Sans, sans-serif",
              fontWeight: "500",
            }}
          >
            <Link
              to="/"
              component={RouterLink}
              underline="none"
              color="primary.contrastText"
            >
              LINGO
            </Link>
          </Typography>
          <Box>
            <Tooltip
              title={
                <Typography
                  component="span"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  {tooltip ?? "Zmień język strony"} <br></br>
                  {languages &&
                    languages.map((el, i) => {
                      if (el != languageData.lang) {
                        return (
                          <Language key={i} lang={el} fontSize="9px"></Language>
                        );
                      }
                    })}
                </Typography>
              }
              slotProps={{
                tooltip: {
                  sx: {
                    bgcolor: "secondary.dark",
                  },
                },
                arrow: {
                  sx: {
                    color: "secondary.dark",
                  },
                },
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -5],
                      },
                    },
                  ],
                },
              }}
              arrow
            >
              <span>
                <Language lang={languageData.lang} noHover></Language>
              </span>
            </Tooltip>
            {options.map((value, index) => {
              if (link[index] === "/logout") {
                return (
                  <Link
                    key={index}
                    to=""
                    component={RouterLink}
                    underline="none"
                    color="primary.contrastText"
                    onClick={handleDialogOpen}
                  >
                    {value}
                  </Link>
                );
              } else {
                return (
                  <Link
                    key={index}
                    to={link[index]}
                    component={RouterLink}
                    underline="none"
                    color="primary.contrastText"
                  >
                    {value}
                  </Link>
                );
              }
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ width: "100%", height: "64px" }}></div>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle align="center">
          {dialog?.title ? dialog?.title : "Wylogowanie"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" align="center">
            {dialog?.subtitle
              ? dialog?.subtitle
              : "Czy na pewno chcesz się wylogować?"}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-around"
            margin="1em .7em 0.3em 1em"
          >
            <Button
              variant="contained"
              className="button-contained"
              sx={{
                ".MuiLink-root": {
                  padding: 0,
                },
                backgroundColor: "primary.contrastText",
              }}
            >
              <Link
                to="/logout"
                component={RouterLink}
                underline="none"
                margin="none"
                padding="none"
              >
                {dialog?.buttons?.submit ? dialog?.buttons?.submit : "Wyloguj"}
              </Link>
            </Button>
            <Button onClick={() => handleDialogClose()}>
              {dialog?.buttons?.cancel ? dialog?.buttons?.cancel : "Anuluj"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Navbar;
