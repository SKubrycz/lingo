import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../state/store";

import Navbar from "../Reusables/Navbar/Navbar";
import MainRegister from "./MainRegister";
import Footer from "../Reusables/Footer/Footer";

import "./Register.scss";
import handleLanguageURL from "../../utilities/handleLanguageURL";
import getBackground from "../../utilities/getBackground";
import { useNavigate } from "react-router-dom";

function Register() {
  const languageData = useSelector((state: RootState) => state.languageReducer);

  const linkArray: string[] = ["/about", "/login"];
  const [optionsArray, setOptionsArray] = useState<string[]>([
    "O aplikacji",
    "Logowanie",
  ]);

  const [tooltip, setTooltip] = useState<string | null>(null);

  const [registerData, setRegisterData] = useState<any>();

  const footerLinkArray: string[] = ["/about", "/login", "/register"];
  const [footerOptionsArray, setFooterOptionsArray] = useState<string[]>([
    "O aplikacji",
    "Logowanie",
    "Rejestracja",
  ]);

  const [languages, setLanguages] = useState<string[] | null>(null);

  const navigate = useNavigate();

  const fetchLanguageData = async (lang: string) => {
    const route = handleLanguageURL("/register", lang);

    await axios.get(route, { withCredentials: true }).then((res) => {
      if (res.data.languageData) {
        const { navbar, main, footer } = res.data.languageData;

        setOptionsArray([navbar.about, navbar.login]);
        setTooltip(navbar.tooltip);

        setRegisterData(main);

        setFooterOptionsArray([footer.about, footer.login, footer.register]);
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
        <MainRegister languageData={registerData}></MainRegister>
        <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
      </div>
    </>
  );
}

export default Register;
