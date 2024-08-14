import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setAlert } from "../../state/alertSnackbar/alertSnackbar";

import { Box, Container } from "@mui/material";

import Navbar from "../Reusables/Navbar/Navbar";
import Lesson from "./Lesson";
import Footer from "../Reusables/Footer/Footer";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";

import "./Lessons.scss";
import PageTitle from "../Reusables/PageTitle/PageTitle";

interface LessonData {
  number: number;
  title: string;
  description: string;
  new_words: string[];
}

function Lessons() {
  const [lessons, setLessons] = useState<LessonData[]>([]);

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

  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const alertSnackbarDataDispatch = useDispatch();

  const navigate = useNavigate();

  const handleAuth = async () => {
    await axios
      .get("http://localhost:8000/lessons", { withCredentials: true })
      .then((res) => {
        setLessons(res.data.result);
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
  }, []);

  return (
    <>
      <Container component="div" className="wrapper">
        <Navbar link={linkArray} options={optionsArray}></Navbar>
        <Box className="lessons-wrapper">
          <PageTitle title="Wszystkie lekcje:"></PageTitle>
          {lessons.map((value: LessonData, index: number) => {
            return <Lesson key={index} lessonData={value}></Lesson>;
          })}
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
