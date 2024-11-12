import { useState, useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import BurgerIcon from "../../../assets/icons/burger.svg";
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
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

interface NavbarProps {
  link: string[];
  options: string[];
}

function Navbar({ link, options }: NavbarProps) {
  const [display, setDisplay] = useState<string>("none");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const navBurgerStyle: Object = {
    display: display,
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleDisplay = () => {
    if (display === "none") {
      setDisplay("flex");
    } else if (display === "flex") {
      setDisplay("none");
    } else return;
  };

  const handleDisplayOnResize = () => {
    if (window.innerWidth > 768) setDisplay("none");
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleDisplayOnResize);

    return () => window.removeEventListener("resize", handleDisplayOnResize);
  }, []);

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
        <DialogTitle align="center">Wylogowanie</DialogTitle>
        <DialogContent>
          <Typography variant="body2" align="center">
            Czy na pewno chcesz się wylogować?
          </Typography>
          <Box display="flex" justifyContent="center" margin=".5em">
            <Button
              variant="contained"
              sx={{
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
                Wyloguj
              </Link>
            </Button>
            <Button onClick={() => handleDialogClose()}>Anuluj</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Navbar;
