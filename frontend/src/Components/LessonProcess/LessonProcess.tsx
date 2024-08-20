import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Container } from "@mui/material";

import Navbar from "../Reusables/Navbar/Navbar";
import Footer from "../Reusables/Footer/Footer";
import LessonProcessStepper from "./LessonProcessStepper";

function LessonProcess() {
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

  const { lessonId } = useParams<{ lessonId: string }>();

  return (
    <Container component="div" className="wrapper">
      <Navbar link={linkArray} options={optionsArray}></Navbar>
      <LessonProcessStepper id={Number(lessonId)}></LessonProcessStepper>
      <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
    </Container>
  );
}

export default LessonProcess;
