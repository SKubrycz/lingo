import axios from "axios";
import { useState, useEffect } from "react";

import Navbar from "../Reusables/Navbar/Navbar";
import MainLogin from "./MainLogin";
import Footer from "../Reusables/Footer/Footer";

import "./Login.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import handleLanguageURL from "../../utilities/handleLanguageURL";
import getBackground from "../../utilities/getBackground";
import { useNavigate } from "react-router-dom";

function Login() {
  const languageData = useSelector((state: RootState) => state.languageReducer);

  const linkArray: string[] = ["/about", "/register"];
  const [optionsArray, setOptionsArray] = useState<string[]>([
    "O aplikacji",
    "Rejestracja",
  ]);

  const [tooltip, setTooltip] = useState<string | null>(null);

  const [loginData, setLoginData] = useState<any>();

  const footerLinkArray: string[] = ["/about", "/register"];
  const [footerOptionsArray, setFooterOptionsArray] = useState<string[]>([
    "O aplikacji",
    "Rejestracja",
  ]);

  const [languages, setLanguages] = useState<string[] | null>(null);

  const navigate = useNavigate();

  const fetchLanguageData = async (lang: string) => {
    const route = handleLanguageURL("/login", lang);

    await axios.get(route, { withCredentials: true }).then((res) => {
      if (res.data.languageData) {
        const { navbar, main, footer } = res.data.languageData;

        setOptionsArray([navbar.about, navbar.register]);
        setTooltip(navbar.tooltip);

        setLoginData(main);

        setFooterOptionsArray([footer.about, footer.register]);
      }

      if (res.data.languages) {
        setLanguages(res.data.languages);
      }

      if (res.data.sessionUser) {
        navigate("/lessons");
      }
    });
  };

  useEffect(() => {
    fetchLanguageData(languageData.lang);

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
          languages={languages}
        ></Navbar>
        <MainLogin languageData={loginData}></MainLogin>
        <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
      </div>
    </>
  );
}

export default Login;
