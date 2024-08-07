import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../Reusables/Navbar/Navbar";
import MainAbout from "./MainAbout";
import Footer from "../Reusables/Footer/Footer";

import { useMessage } from "../..";

import "./About.scss";

function About() {
  const [linkArray, setLinkArray] = useState<string[]>(["/login", "/register"]);
  const [optionsArray, setOptionsArray] = useState<string[]>([
    "Logowanie",
    "Rejestracja",
  ]);

  const footerLinkArray: string[] = ["/about", "/login", "/register"];
  const footerOptionsArray: string[] = [
    "O aplikacji",
    "Logowanie",
    "Rejestracja",
  ];

  const { message, setMessage } = useMessage();

  const navigate = useNavigate();

  const handleAuth = () => {
    axios
      .get("http://localhost:8000/about", { withCredentials: true })
      .then((res) => {
        if (res.data.login) {
          //console.log(res.data.login);
          setLinkArray(["/lessons", `/profile/${res.data.login}`, "/logout"]);
          setOptionsArray(["Lekcje", "Profil", "Wyloguj"]);
        } else {
          //console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage("Sesja wygasła. Proszę zalogować się ponownie");
        navigate("/");
      });
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <>
      <div className="wrapper">
        <Navbar link={linkArray} options={optionsArray}></Navbar>
        <MainAbout></MainAbout>
        <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
      </div>
    </>
  );
}

export default About;
