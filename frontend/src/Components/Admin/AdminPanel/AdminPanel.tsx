import { ThemeProvider } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminTheme } from "../../../adminTheme";

export default function AdminPanel() {
  const { state } = useLocation();

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const res = await axios.get(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT}/admin/panel`,
        { withCredentials: true }
      );

      console.log(res.data);
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
      }
    }
  };

  useEffect(() => {
    if (!state || !state.hasOwnProperty("fromAdmin")) navigate("/");
    handleAuth();
  }, []);

  return (
    <ThemeProvider theme={adminTheme}>
      <Box
        width="100%"
        height="100vh"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "primary.contrastText",
        }}
      >
        <Typography>Admin Panel</Typography>
      </Box>
    </ThemeProvider>
  );
}
