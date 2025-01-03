import { ThemeProvider } from "@emotion/react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import axios, { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminTheme } from "../../../adminTheme";
import SubpagesTab from "./SubpagesTab";
import LessonsTab from "./LessonsTab";

export default function AdminPanel() {
  const [value, setValue] = useState<number>(0);

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

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          color: "primary.dark",
          backgroundColor: "primary.contrastText",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontFamily: "Fira Sans, sans-serif",
            fontWeight: "500",
          }}
        >
          LINGO
        </Typography>
        <Typography>Admin Panel</Typography>
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label="Podstrony"></Tab>
          <Tab label="Lekcje"></Tab>
        </Tabs>
        <SubpagesTab currentIndex={value} tabIndex={0}></SubpagesTab>
        <LessonsTab currentIndex={value} tabIndex={1}></LessonsTab>
      </Box>
    </ThemeProvider>
  );
}
