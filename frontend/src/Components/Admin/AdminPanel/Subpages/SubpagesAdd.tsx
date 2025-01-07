import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import getBackground from "../../getBackground";
import { ThemeProvider } from "@emotion/react";
import { adminTheme } from "../../../../adminTheme";
import AdminPanelNavbar from "../AdminPanelNavbar";

export default function SubpagesAdd() {
  useEffect(() => {
    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  return (
    <ThemeProvider theme={adminTheme}>
      <Box
        width="100%"
        height="100vh"
        sx={{
          color: "primary.dark",
          backgroundColor: "primary.contrastText",
        }}
      >
        <Box
          sx={{
            width: "100%",
            marginTop: "60px",
          }}
        ></Box>
        <AdminPanelNavbar></AdminPanelNavbar>
        <Typography variant="h6" color="primary.main">
          SubpagesAdd
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
