import { useState } from "react";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  ThemeProvider,
  Typography,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import axios, { isAxiosError } from "axios";
import { adminTheme } from "../../../adminTheme";

interface AdminPanelNavbarProps {}

export default function AdminPanelNavbar({}: AdminPanelNavbarProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const navigate = useNavigate();

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

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT}/admin/logout`,
        {},
        { withCredentials: true }
      );

      console.log(res.data);

      navigate("/admin");
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
      }
    }
  };

  return (
    <ThemeProvider theme={adminTheme}>
      <AppBar
        component="nav"
        position="fixed"
        elevation={trigger ? 4 : 0}
        sx={{
          padding: "1em 1.5em",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "primary.contrastText",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontFamily: "Fira Sans, sans-serif",
            fontWeight: "500",
            color: "primary.main",
          }}
        >
          LINGO
        </Typography>
        <Typography
          component="div"
          onClick={() => handleDialogOpen()}
          sx={{ color: "primary.main", cursor: "pointer" }}
        >
          Wyloguj
        </Typography>
      </AppBar>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle align="center" color="primary.main">
          Wylogowanie
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" align="center" color="primary.main">
            Czy na pewno chcesz się wylogować?
          </Typography>
          <Box
            component="form"
            method="post"
            display="flex"
            justifyContent="space-around"
            margin="1em .7em 0.3em 1em"
            color="primary.contrastText"
            onSubmit={(e) => handleLogout(e)}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                ".MuiLink-root": {
                  padding: 0,
                },
              }}
            >
              Wyloguj
            </Button>
            <Button onClick={() => handleDialogClose()}>Anuluj</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
