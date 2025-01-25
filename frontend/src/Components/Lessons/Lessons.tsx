import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setAlert } from "../../state/alertSnackbarSlice";

import { Box, Container, Stack, Divider } from "@mui/material";

import Navbar from "../Reusables/Navbar/Navbar";
import Lesson from "./Lesson";
import Footer from "../Reusables/Footer/Footer";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";
import PageTitle from "../Reusables/PageTitle/PageTitle";
import { AlertSnackbarState } from "../../state/alertSnackbarSlice";

import "./Lessons.scss";
import getBackground from "../../utilities/getBackground";

export interface Buttons {
  begin: string;
  repeat: string;
}

interface LessonData {
  lessonId: number;
  title: string;
  description: string;
  new_words: string[];
}

interface UsersLessonsData {
  lessonId: number;
  timeSpent: DOMHighResTimeStamp;
  accuracy: number;
  finished: boolean;
}

function Lessons() {
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [usersLessons, setUserLessons] = useState<UsersLessonsData[]>([]);

  const [languages, setLanguages] = useState<string[] | null>(null);

  const [linkArray, setLinkArray] = useState<string[]>([
    "/about",
    "/profile",
    "/logout",
  ]);
  const [footerLinkArray, setFooterLinkArray] = useState<string[]>([
    "/about",
    "/profile",
  ]);

  const [optionsArray, setOptionsArray] = useState<string[]>([
    "O aplikacji",
    "Profil",
    "Wyloguj",
  ]);

  const [footerOptionsArray, setFooterOptionsArray] = useState<string[]>([
    "O aplikacji",
    "Profil",
  ]);

  const [tooltip, setTooltip] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [buttons, setButtons] = useState<Buttons | null>(null);
  const [logoutDialog, setLogoutDialog] = useState<any | null>(null);

  const alertSnackbarData: AlertSnackbarState = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const languageData = useSelector((state: RootState) => state.languageReducer);
  const alertSnackbarDataDispatch = useDispatch();

  const navigate = useNavigate();

  const handleAuth = async () => {
    await axios
      .get(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/lessons?language=${languageData.lang}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setLessons(res.data.lessonsResult);
        setUserLessons(res.data.usersLessonsResult);
        setLinkArray(["/about", `/profile/${res.data.login}`, "/logout"]);
        setFooterLinkArray(["/about", `/profile/${res.data.login}`]);

        if (res.data.languageData) {
          setOptionsArray([
            res.data.languageData.navbar.about,
            res.data.languageData.navbar.profile,
            res.data.languageData.navbar.logout.title,
          ]);
          setFooterOptionsArray([
            res.data.languageData.footer.about,
            res.data.languageData.footer.profile,
          ]);

          setTooltip(res.data.languageData.navbar.tooltip);
          setTitle(res.data.languageData.title);
          setButtons(res.data.languageData.buttons);

          setLogoutDialog(res.data.languageData.navbar.logout.dialog);
        }

        if (res.data.languages) {
          setLanguages(res.data.languages);
        }
      })
      .catch((error) => {
        console.log(error);
        if (isAxiosError(error)) {
          if (error.status === 401) navigate("/");
          alertSnackbarDataDispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              content: error?.response?.data.message,
            })
          );
        }
      });
  };

  useEffect(() => {
    handleAuth();

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  return (
    <>
      <Container component="div" className="wrapper">
        <Navbar
          link={linkArray}
          options={optionsArray}
          tooltip={tooltip}
          dialog={logoutDialog}
          languages={languages}
        ></Navbar>
        <Box className="lessons-wrapper">
          <PageTitle title={title ? title : "Wszystkie lekcje"}></PageTitle>
          <Stack
            spacing={4}
            divider={<Divider orientation="horizontal"></Divider>}
            sx={{ minWidth: "60%", margin: "1em" }}
          >
            {lessons.map((value: LessonData, index: number) => {
              return (
                <Lesson
                  key={index}
                  lessonData={value}
                  buttons={buttons}
                  finished={usersLessons[index]?.finished}
                ></Lesson>
              );
            })}
          </Stack>
        </Box>
        <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
      </Container>
      <AlertSnackbar
        severity={alertSnackbarData.severity}
        variant={alertSnackbarData.variant}
        title={alertSnackbarData.title}
        content={alertSnackbarData.content}
      ></AlertSnackbar>
    </>
  );
}
export default Lessons;
