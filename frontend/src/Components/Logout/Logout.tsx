import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setAlert } from "../../state/alertSnackbar/alertSnackbar";

function Logout() {
  const navigate = useNavigate();

  const alertSnackbarDataDispatch = useDispatch();

  const handleLogout = async () => {
    await axios
      .get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/logout`, {
        withCredentials: true,
      })
      .then(() => {
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
