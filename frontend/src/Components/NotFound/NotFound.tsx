import axios from "axios";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../Reusables/Navbar/Navbar";

import "./NotFound.scss";
import getBackground from "../../utilities/getBackground";

function NotFound() {
  const [info, setInfo] = useState<string | null>(null);

  const linkArray: string[] = ["/"];
  const optionsArray: string[] = ["Strona główna"];

  const handleNotFound = async () => {
    await axios
      .get(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/*`)
      .catch((err) => {
        console.log(err.response.data);
        setInfo(err.response.data);
      });
  };

  useEffect(() => {
    handleNotFound();

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  //TODO: Refactor into MUI Components

  return (
    <div className="wrapper">
      <Navbar link={linkArray} options={optionsArray}></Navbar>
      <main className="main-notfound">
        <h1>{info}</h1>
        <h2>Powrót na stronę główną:</h2>
        <button className="main-notfound-button">
          <Link to="/">Strona główna</Link>
        </button>
      </main>
    </div>
  );
}

export default NotFound;
