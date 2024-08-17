import axios from "axios";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setAlert } from "../../state/alertSnackbar/alertSnackbar";

import Navbar from "../Reusables/Navbar/Navbar";
import MainProfile from "./MainProfile";
import Footer from "../Reusables/Footer/Footer";

import "./Profile.scss";

interface User {
  login: string;
  createdDate: string;
  sessionUser: boolean;
}

function Profile() {
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

  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);

  const footerOptionsArray: string[] = ["O aplikacji", "Lekcje", "Profil"];

  const navigate = useNavigate();

  const alertSnackbarDataDispatch = useDispatch();

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/profile`, {
        withCredentials: true,
      });
      if (res.data.sessionUser === true) {
        // setLinkArray(['/about', '/lessons', '/logout']);
        // setOptionsArray(['O aplikacji', 'Lekcje', 'Wyloguj']);
      }
    } catch (error) {
      console.log("Failed to fetch current user data: ", error);
      navigate("/");
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get<User>(
        `http://localhost:8000/profile/${userId}`,
        { withCredentials: true }
      );
      setLinkArray(["/about", "/lessons", "/logout"]);
      setOptionsArray(["O aplikacji", "Lekcje", "Wyloguj"]);

      setFooterLinkArray(["/about", "/lessons", `/profile/${res.data.login}`]);

      if (res.data.sessionUser === true) {
        setUser(res.data);
      } else {
        setUser(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      alertSnackbarDataDispatch(
        setAlert({
          severity: "info",
          variant: "standard",
          title: "Informacja",
          content: "Sesja wygasła. Proszę zalogować się ponownie",
        })
      );
      navigate("/");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchUserData();
  }, [userId]);

  return (
    <>
      <div className="wrapper">
        <Navbar link={linkArray} options={optionsArray}></Navbar>
        <MainProfile user={user}></MainProfile>
        <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
      </div>
    </>
  );
}

export default Profile;
