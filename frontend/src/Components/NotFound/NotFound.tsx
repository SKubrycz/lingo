import axios from "axios";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../Reusables/Navbar/Navbar";

import "./NotFound.scss";
import getBackground from "../../utilities/getBackground";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import handleLanguageURL from "../../utilities/handleLanguageURL";

function NotFound() {
  const stateLanguageData = useSelector(
    (state: RootState) => state.languageReducer
  );
  const [info, setInfo] = useState<string | null>(null);
  const [languageData, setLanguageData] = useState<any | null>(null);
  const [languages, setLanguages] = useState<string[] | null>(null);

  const linkArray: string[] = ["/"];
  const optionsArray: string[] = ["Strona główna"];

  const handleNotFound = async () => {
    const route = handleLanguageURL("/*", stateLanguageData.lang);

    try {
      const res = await axios.get(route);

      if (res.data.message) {
        setInfo(res.data.message);
      }
      if (res.data.languageData) {
        setLanguageData(res.data.languageData);
      }
      if (res.data.languages) {
        setLanguages(res.data.languages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleNotFound();

    const bg = getBackground("/not-found");
    document.body.style.backgroundColor = bg;
  }, []);

  return (
    <div className="wrapper">
      <Navbar
        link={linkArray}
        options={optionsArray}
        tooltip={languageData?.navbar?.tooltip}
        languages={languages}
      ></Navbar>
      <main className="main-notfound">
        <h1>{info}</h1>
        <h2>
          {languageData?.main?.return
            ? languageData.main.return
            : "Powrót na stronę główną"}
          :
        </h2>
        <button className="main-notfound-button">
          <Link to="/">
            {languageData?.main?.button
              ? languageData.main.button
              : "Strona główna"}
          </Link>
        </button>
      </main>
    </div>
  );
}

export default NotFound;
