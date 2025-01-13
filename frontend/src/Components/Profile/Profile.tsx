import axios from "axios";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../state/alertSnackbarSlice";

import Navbar from "../Reusables/Navbar/Navbar";
import MainProfile from "./MainProfile";
import Footer from "../Reusables/Footer/Footer";

import "./Profile.scss";
import getBackground from "../../utilities/getBackground";
import handleLanguageURL from "../../utilities/handleLanguageURL";
import { RootState } from "../../state/store";

export interface Stats {
  totalTimeSpent: DOMHighResTimeStamp;
  finishedLessonsCount: number;
  accuracy: number;
  wordsLearned: number;
  timestamps: number[];
}

export interface User {
  login: string;
  createdDate: string;
  sessionUser: boolean;
  languageData: any;
  languages: string[];
  stats: Stats;
  words: string[];
}

function Profile() {
  const stateLanguageData = useSelector(
    (state: RootState) => state.languageReducer
  );
  const [linkArray, setLinkArray] = useState<string[]>(["/about", "/lessons"]);
  const [optionsArray, setOptionsArray] = useState<string[]>([
    "O aplikacji",
    "Lekcje",
  ]);
  const [footerLinkArray, setFooterLinkArray] = useState<string[]>([
    "/about",
    "/lessons",
    "/profile",
  ]);
  const [footerOptionsArray, setFooterOptionsArray] = useState<string[]>([
    "O aplikacji",
    "Lekcje",
  ]);

  const { userId } = useParams<{ userId: string | undefined }>();
  const [user, setUser] = useState<User | null>(null);
  const [languageData, setLanguageData] = useState<any | null>(null);
  const [languages, setLanguages] = useState<string[] | null>(null);
  const [logoutDialog, setLogoutDialog] = useState<any | null>(null);

  const navigate = useNavigate();

  const alertSnackbarDataDispatch = useDispatch();

  const fetchUserData = async () => {
    const route = handleLanguageURL(
      `/profile/${userId}`,
      stateLanguageData.lang
    );

    try {
      const res = await axios.get<User>(route, { withCredentials: true });
      setLinkArray(["/about", "/lessons", "/logout"]);
      setFooterLinkArray(["/about", "/lessons"]);

      if (res.data.languageData.navbar) {
        setOptionsArray([
          res.data.languageData.navbar.about,
          res.data.languageData.navbar.lessons,
          res.data.languageData.navbar.logout.title,
        ]);

        setLogoutDialog(res.data.languageData.navbar.logout.dialog);
      } else {
        setOptionsArray(["O aplikacji", "Lekcje", "Wyloguj"]);
      }

      if (res.data.languageData.footer) {
        setFooterOptionsArray([
          res.data.languageData.footer.about,
          res.data.languageData.footer.lessons,
        ]);
      } else {
        setFooterOptionsArray(["O aplikacji", "Lekcje"]);
      }

      if (res.data.sessionUser === true) {
        console.log(res.data);
        setUser(res.data);
      } else {
        setUser(res.data);
      }

      console.log(res.data);

      if (res.data.languageData) {
        setLanguageData(res.data.languageData);
      }
      if (res.data.languages) {
        setLanguages(res.data.languages);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

        if (error.request?.status === 404) {
          alertSnackbarDataDispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              title: "Błąd",
              content: "Nie znaleziono użytkownika",
            })
          );
        } else {
          alertSnackbarDataDispatch(
            setAlert({
              severity: "info",
              variant: "standard",
              title: "Informacja",
              content: "Sesja wygasła. Proszę zalogować się ponownie",
            })
          );
        }
        //console.error("Failed to fetch user data:", error);
      }
      navigate("/lessons");
    }
  };

  useEffect(() => {
    //fetchCurrentUser();
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  return (
    <>
      <div className="wrapper">
        <Navbar
          link={linkArray}
          options={optionsArray}
          tooltip={languageData?.navbar?.tooltip}
          dialog={logoutDialog}
          languages={languages}
        ></Navbar>
        <MainProfile user={user} languageData={languageData}></MainProfile>
        <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
      </div>
    </>
  );
}

export default Profile;
