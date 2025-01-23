import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  ThemeProvider,
  Typography,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import axios, { isAxiosError } from "axios";
import { adminTheme } from "../../../adminTheme";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../state/alertSnackbarSlice";

interface AdminPanelNavbarProps {}

export default function AdminPanelNavbar({}: AdminPanelNavbarProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

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
      await axios.post(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT}/admin/logout`,
        {},
        { withCredentials: true }
      );

      navigate("/lessons");
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        if (error.status === 403) {
          navigate("/not-found");
        } else {
          if (error.status && error.status > 399) {
            dispatch(
              setAlert({
                severity: "error",
                variant: "filled",
                title: "Błąd",
                content: error.response?.data.message,
              })
            );
          }

          navigate("/admin");
        }
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
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Link
            to="/admin/panel"
            component={RouterLink}
            state={{ fromAdmin: true }}
            underline="none"
            color="primary.contrastText"
            sx={{ margin: 0, padding: 0 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  margin: 0,
                  fontFamily: "Fira Sans, sans-serif",
                  fontWeight: "500",
                  lineHeight: "initial",
                  color: "primary.main",
                }}
              >
                LINGO
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  margin: "0 0.5em",
                  fontFamily: "Fira Sans, sans-serif",
                  fontWeight: "400",
                  color: "primary.main",
                }}
              >
                Admin Panel
              </Typography>
            </Box>
          </Link>
        </Box>
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
