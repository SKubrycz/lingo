import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../state/alertSnackbarSlice";
import getBackground from "../../utilities/getBackground";
import handleLanguageURL from "../../utilities/handleLanguageURL";
import { RootState } from "../../state/store";

function Logout() {
  const stateLanguageData = useSelector(
    (state: RootState) => state.languageReducer
  );
  const navigate = useNavigate();

  const alertSnackbarDataDispatch = useDispatch();

  const handleLogout = async () => {
    const route = handleLanguageURL("/logout", stateLanguageData.lang);

    await axios
      .get(route, {
        withCredentials: true,
      })
      .then((res) => {
        alertSnackbarDataDispatch(
          setAlert({
            severity: "info",
            variant: "standard",
            content: res.data.message,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        if (isAxiosError(error)) {
        }
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
