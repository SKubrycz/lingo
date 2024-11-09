import { useState, useEffect, useRef } from "react";

import Navbar from "../Reusables/Navbar/Navbar";
import MainHome from "./MainHome";
import Footer from "../Reusables/Footer/Footer";

import "./Home.scss";
import ScrollArrow from "../Reusables/ScrollArrow/ScrollArrow";

function Home() {
  const linkArray: string[] = ["/about", "/login", "/register"];
  const optionsArray: string[] = ["O aplikacji", "Logowanie", "Rejestracja"];

  const footerLinkArray: string[] = ["/about", "/login", "/register"];
  const footerOptionsArray: string[] = [
    "O aplikacji",
    "Logowanie",
    "Rejestracja",
  ];

  const [visible, setVisible] = useState<boolean>(true);

  const wrapperRef = useRef<HTMLDivElement>(null);

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
      <Navbar link={linkArray} options={optionsArray}></Navbar>
      <MainHome></MainHome>
      {visible && <ScrollArrow></ScrollArrow>}
      <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
    </div>
  );
}

export default Home;
