import { useState, useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import BurgerIcon from "../../../assets/icons/burger.svg";
import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

interface NavbarProps {
  link: string[];
  options: string[];
}

function Navbar({ link, options }: NavbarProps) {
  const [display, setDisplay] = useState<string>("none");

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

  useEffect(() => {
    window.addEventListener("resize", handleDisplayOnResize);

    return () => window.removeEventListener("resize", handleDisplayOnResize);
  }, []);

  return (
    <>
      <AppBar component="nav" position="fixed" elevation={trigger ? 4 : 0}>
        <Toolbar className="navbar-color">
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              display: "block",
              fontFamily: "Fira Sans",
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
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ width: "100%", height: "64px" }}></div>
    </>
  );
}

export default Navbar;
