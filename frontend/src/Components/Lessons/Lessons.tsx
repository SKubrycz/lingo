import axios from "axios";
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

  const [linkArray, setLinkArray] = useState<string[]>([
    "/about",
    "/profile",
    "/logout",
  ]);
  const [footerLinkArray, setFooterLinkArray] = useState<string[]>([
    "/about",
    "/lessons",
    "/profile",
  ]);

  const optionsArray: string[] = ["O aplikacji", "Profil", "Wyloguj"];

  const footerOptionsArray: string[] = ["O aplikacji", "Lekcje", "Profil"];

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
        setFooterLinkArray([
          "/about",
          "/lessons",
          `/profile/${res.data.login}`,
        ]);
      })
      .catch((error) => {
        console.log(error);
        alertSnackbarDataDispatch(
          setAlert({
            severity: "info",
            variant: "standard",
            title: "Informacja",
            content: "Sesja wygasła. Proszę zalogować się ponownie",
          })
        );
        navigate("/");
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
        <Navbar link={linkArray} options={optionsArray}></Navbar>
        <Box className="lessons-wrapper">
          <PageTitle title="Wszystkie lekcje"></PageTitle>
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
