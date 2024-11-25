import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

import Navbar from "../Reusables/Navbar/Navbar";
import MainHome from "./MainHome";
import Footer from "../Reusables/Footer/Footer";

import "./Home.scss";
import ScrollArrow from "../Reusables/ScrollArrow/ScrollArrow";

import handleLanguageURL from "../../utilities/handleLanguageURL";

interface HomeTitle {
  title: string;
  desc: string;
}

export interface HomeButtonContainer {
  subtitle: string;
  button: string;
}

export interface LanguageData {
  titles: HomeTitle[];
  buttonContainer: HomeButtonContainer;
}

function Home() {
  let linkArray: string[] = ["/about", "/login", "/register"];
  const [optionsArray, setOptionsArray] = useState<string[]>([
    "O aplikacji",
    "Logowanie",
    "Rejestracja",
  ]);

  const [homeData, setHomeData] = useState<LanguageData | null>(null);

  let footerLinkArray: string[] = ["/about", "/login", "/register"];
  const [footerOptionsArray, setFooterOptionsArray] = useState<string[]>([
    "O aplikacji",
    "Logowanie",
    "Rejestracja",
  ]);

  const [tooltip, setTooltip] = useState<string | null>(null);

  const [visible, setVisible] = useState<boolean>(true);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const languageData = useSelector((state: RootState) => state.languageReducer);

  const handleAuth = async (lang: string | null) => {
    const route = handleLanguageURL("/", lang);

    await axios
      .get(route, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.languageData) {
          const navbar = [
            res.data.languageData.navbar.about,
            res.data.languageData.navbar.login,
            res.data.languageData.navbar.register,
          ];
          setOptionsArray(navbar);

          const footer = [
            res.data.languageData.footer.about,
            res.data.languageData.footer.login,
            res.data.languageData.footer.register,
          ];
          setFooterOptionsArray(footer);

          const tooltipData = res.data.languageData.navbar.tooltip;

          setTooltip(tooltipData);

          const homeData: LanguageData = {
            titles: res.data.languageData.titles,
            buttonContainer: res.data.languageData.buttonContainer,
          };

          setHomeData(homeData);
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/lessons");
      });
  };

  useEffect(() => {
    handleAuth(languageData.lang);
  }, []);

  const checkScroll = () => {
    if (document.scrollingElement) {
      const { scrollHeight, clientHeight, scrollTop } =
        document.scrollingElement;

      if (Math.abs(scrollHeight - (scrollTop + clientHeight)) <= 1) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", checkScroll);

    return () => {
      document.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="wrapper">
      <Navbar
        link={linkArray}
        options={optionsArray}
        tooltip={tooltip}
      ></Navbar>
      <MainHome languageData={homeData}></MainHome>
      {visible && <ScrollArrow></ScrollArrow>}
      <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
    </div>
  );
}

export default Home;
