import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../state/alertSnackbar/alertSnackbar";

import { useMessage } from "../..";

function Logout() {
  const { message, setMessage } = useMessage();

  const navigate = useNavigate();

  const alertSnackbarDataDispatch = useDispatch();

  const handleLogout = async () => {
    await axios
      .get("http://localhost:8000/logout", { withCredentials: true })
      .then(() => {
        //setMessage("Nastąpiło wylogowanie");
        alertSnackbarDataDispatch(
          setAlert({
            severity: "info",
            variant: "standard",
            title: "Informacja",
            content: "Nastąpiło wylogowanie",
          })
        );
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleLogout();
  });

  return <></>;
}

export default Logout;
