import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setAlert } from "../../state/alertSnackbarSlice";

import Navbar from "../Reusables/Navbar/Navbar";
import MainAbout from "./MainAbout";
import Footer from "../Reusables/Footer/Footer";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";

import "./About.scss";
import handleLanguageURL from "../../utilities/handleLanguageURL";
import getBackground from "../../utilities/getBackground";

function About() {
  const languageData = useSelector((state: RootState) => state.languageReducer);

  const [linkArray, setLinkArray] = useState<string[]>(["/login", "/register"]);
  const [optionsArray, setOptionsArray] = useState<string[]>([
    "Logowanie",
    "Rejestracja",
  ]);

  const [tooltip, setTooltip] = useState<string | null>(null);

  const [footerLinkArray, setFooterLinkArray] = useState<string[]>([
    "/login",
    "/register",
  ]);
  const [footerOptionsArray, setFooterOptionsArray] = useState<string[]>([
    "Logowanie",
    "Rejestracja",
  ]);

  const [aboutData, setAboutData] = useState<any>();

  const [logoutDialog, setLogoutDialog] = useState<any | null>(null);
  const [languages, setLanguages] = useState<string[] | null>(null);

  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const alertSnackbarDataDispatch = useDispatch();

  const navigate = useNavigate();

  const handleAuth = async (lang: string | null) => {
    const route = handleLanguageURL("/about", lang);

    await axios
      .get(route, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.login) {
          setLinkArray(["/lessons", `/profile/${res.data.login}`, "/logout"]);
          setFooterLinkArray(["/lessons", `/profile/${res.data.login}`]);

          if (res.data.languageData) {
            const navbar = [
              res.data.languageData.navbarLogin.lessons,
              res.data.languageData.navbarLogin.profile,
              res.data.languageData.navbarLogin.logout.title,
            ];

            setOptionsArray(navbar);

            setTooltip(res.data.languageData.navbarLogin.tooltip);

            setAboutData(res.data.languageData.titles);

            setLogoutDialog(res.data.languageData.navbarLogin.logout.dialog);

            const footer = [
              res.data.languageData.footerLogin.lessons,
              res.data.languageData.footerLogin.profile,
            ];

            setFooterOptionsArray(footer);
          } else {
            setOptionsArray(["Lekcje", "Profil", "Wyloguj"]);
            setFooterOptionsArray(["O aplikacji", "Lekcje", "Profil"]);
          }
        } else {
          console.log(res.data);

          if (res.data.languageData) {
            console.log(res.data.languageData);
            const navbar = [
              res.data.languageData.navbar.login,
              res.data.languageData.navbar.register,
            ];

            setOptionsArray(navbar);
            setTooltip(res.data.languageData.navbar.tooltip);

            setAboutData(res.data.languageData.titles);

            const footer = [
              res.data.languageData.footer.login,
              res.data.languageData.footer.register,
            ];

            setFooterOptionsArray(footer);
          }
        }

        if (res.data.languages) {
          setLanguages(res.data.languages);
        }
      })
      .catch((error) => {
        console.log(error);
        alertSnackbarDataDispatch(
          setAlert({
            severity: "info",
            variant: "standard",
            content: "Sesja wygasła. Proszę zalogować się ponownie",
          })
        );
        navigate("/");
      });
  };

  useEffect(() => {
    handleAuth(languageData.lang);

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  return (
    <>
      <div className="wrapper">
        <Navbar
          link={linkArray}
          options={optionsArray}
          tooltip={tooltip}
          dialog={logoutDialog}
          languages={languages}
        ></Navbar>
        <MainAbout languageData={aboutData}></MainAbout>
        <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
        <AlertSnackbar
          severity={alertSnackbarData.severity}
          variant={alertSnackbarData.variant}
          title={alertSnackbarData.title}
          content={alertSnackbarData.content}
        ></AlertSnackbar>
      </div>
    </>
  );
}

export default About;
