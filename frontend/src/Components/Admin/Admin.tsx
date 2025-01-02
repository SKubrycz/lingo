import { Box, Button, Input, ThemeProvider, Typography } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminTheme } from "../../adminTheme";

export function Admin() {
  const [code, setCode] = useState<string>("");

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

  const submitCode = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT}/admin`,
        { code: code },
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
    handleAuth();
  }, []);

  return (
    <ThemeProvider theme={adminTheme}>
      <Box
        width="100%"
        height="100vh"
        component="form"
        method="post"
        onSubmit={(e) => submitCode(e)}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "primary.contrastText",
        }}
      >
        <Typography>Podaj kod otrzymany w wiadomości email:</Typography>
        <Input
          onChange={(e) => setCode(e.target.value)}
          sx={{
            margin: "1em",
            ".MuiInput-input": {
              textAlign: "center",
            },
          }}
        ></Input>
        <Button type="submit" name="submit" variant="contained">
          Zatwierdź
        </Button>
      </Box>
    </ThemeProvider>
  );
}
