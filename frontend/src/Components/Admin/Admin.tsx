import { Box, Button, Input, ThemeProvider, Typography } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminTheme } from "../../adminTheme";

export function Admin() {
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const res = await axios.get(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT}/admin`,
        { withCredentials: true }
      );

      console.log(res);
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        if (error.status === 403) navigate("/not-found");
      }
    }
  };

  useEffect(() => {
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
        <Typography>Podaj kod otrzymany w wiadomości email:</Typography>
        <Input sx={{ margin: "1em" }}></Input>
        <Button variant="contained">Zatwierdź</Button>
      </Box>
    </ThemeProvider>
  );
}
