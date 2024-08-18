import axios from "axios";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setAlert } from "../../state/alertSnackbar/alertSnackbar";

import Navbar from "../Reusables/Navbar/Navbar";
import MainProfile from "./MainProfile";

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

  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const alertSnackbarDataDispatch = useDispatch();

  /*   const fetchCurrentUser = async () => {
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
  }; */

  const fetchUserData = async () => {
    try {
      const res = await axios.get<User>(
        `http://localhost:8000/profile/${userId}`,
        { withCredentials: true }
      );
      setLinkArray(["/about", "/lessons", "/logout"]);
      setOptionsArray(["O aplikacji", "Lekcje", "Wyloguj"]);

      if (res.data.sessionUser === true) {
        setUser(res.data);
      } else {
        setUser(res.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

        //IDEA: Make `User not found` Profile page
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

  return (
    <>
      <div className="wrapper">
        <Navbar link={linkArray} options={optionsArray}></Navbar>
        <MainProfile user={user}></MainProfile>
      </div>
    </>
  );
}

export default Profile;
