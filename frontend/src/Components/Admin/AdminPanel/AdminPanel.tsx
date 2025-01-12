import { ThemeProvider } from "@emotion/react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import axios, { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminTheme } from "../../../adminTheme";
import SubpagesTab from "./Subpages/SubpagesTab";
import LessonsTab from "./Lessons/LessonsTab";
import AdminPanelNavbar from "./AdminPanelNavbar";
import getBackground from "../../../utilities/getBackground";
import AlertSnackbar from "../../Reusables/Informational/AlertSnackbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { setAlert } from "../../../state/alertSnackbarSlice";

interface ChooseIndexProps {
  currentIndex: number;
  subpagesData: any;
  lessonsData: any[];
}

function ChooseIndex({
  currentIndex,
  subpagesData,
  lessonsData,
}: ChooseIndexProps) {
  switch (currentIndex) {
    case 0:
      return <SubpagesTab subpagesData={subpagesData}></SubpagesTab>;
    case 1:
      return <LessonsTab lessonsData={lessonsData}></LessonsTab>;
    default:
      return <SubpagesTab subpagesData={subpagesData}></SubpagesTab>;
  }
}

export default function AdminPanel() {
  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );

  const [subpagesData, setSubpagesData] = useState<any>();
  const [lessonsData, setLessonsData] = useState<any[][]>([]);
  const [value, setValue] = useState<number>(0);

  const { state } = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAuth = async () => {
    try {
      const res = await axios.get(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT}/admin/panel`,
        { withCredentials: true }
      );
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

  const fetchSubpages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/admin/panel/subpages`,
        { withCredentials: true }
      );

      setSubpagesData(res.data);
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

  const fetchLessons = async () => {
    try {
      const res = await axios.get(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/admin/panel/lessons`,
        { withCredentials: true }
      );

      setLessonsData(res.data);
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

  useEffect(() => {
    if (!state || !state.hasOwnProperty("fromAdmin")) navigate("/admin");
    handleAuth();
    fetchSubpages();
    fetchLessons();

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
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
            <ChooseIndex
              currentIndex={value}
              subpagesData={subpagesData}
              lessonsData={lessonsData}
            ></ChooseIndex>
          </Box>
        </Box>
        <AlertSnackbar
          severity={alertSnackbarData.severity}
          variant={alertSnackbarData.variant}
          title={alertSnackbarData.title}
          content={alertSnackbarData.content}
        ></AlertSnackbar>
      </Box>
    </ThemeProvider>
  );
}
