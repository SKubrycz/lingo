import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setAlert } from "../../state/alertSnackbarSlice";
import getBackground from "../../utilities/getBackground";

function Logout() {
  const navigate = useNavigate();

  const alertSnackbarDataDispatch = useDispatch();

  const handleLogout = async () => {
    await axios
      .get(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/logout`, {
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

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  });

  return <></>;
}

export default Logout;
