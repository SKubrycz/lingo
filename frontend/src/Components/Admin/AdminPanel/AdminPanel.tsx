import { ThemeProvider } from "@emotion/react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import axios, { isAxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminTheme } from "../../../adminTheme";
import SubpagesTab from "./SubpagesTab";
import LessonsTab from "./LessonsTab";
import AdminPanelNavbar from "./AdminPanelNavbar";

interface ChooseIndexProps {
  currentIndex: number;
}

function ChooseIndex({ currentIndex }: ChooseIndexProps) {
  switch (currentIndex) {
    case 0:
      return <SubpagesTab></SubpagesTab>;
    case 1:
      return <LessonsTab></LessonsTab>;
    default:
      return <SubpagesTab></SubpagesTab>;
  }
}

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
        if (error.status === 403) {
          navigate("/not-found");
        } else {
          navigate("/admin");
        }
      }
    }
  };

  useEffect(() => {
    if (!state || !state.hasOwnProperty("fromAdmin")) navigate("/admin");
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
          color: "primary.dark",
          backgroundColor: "primary.contrastText",
        }}
      >
        <AdminPanelNavbar></AdminPanelNavbar>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "fit-content",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography>Admin Panel</Typography>
            <Tabs
              value={value}
              onChange={handleTabChange}
              sx={{
                width: "100%",
                borderBottom: "1px solid rgb(224, 224, 224)",
              }}
            >
              <Tab label="Podstrony"></Tab>
              <Tab label="Lekcje"></Tab>
            </Tabs>
            <ChooseIndex currentIndex={value}></ChooseIndex>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
