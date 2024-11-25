import { forwardRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";

import { setLanguage } from "../../../state/languageSlice";

import "/node_modules/flag-icons/css/flag-icons.min.css";

interface LanguageProps {
  lang: string;
  fontSize?: string;
  noHover?: boolean;
}

const Language = forwardRef<HTMLElement, LanguageProps>(function Language(
  { lang, fontSize, noHover = false },
  ref
) {
  let navigate = useNavigate();

  const handleLanguageChange = () => {
    localStorage.setItem("language-lingo", lang);
    setLanguage({ lang: lang });

    // refresh page after language change
    navigate(0);
  };

  return (
    <Typography
      ref={ref}
      className={`fi fi-${lang}`}
      variant="body1"
      onClick={noHover ? undefined : () => handleLanguageChange()}
      sx={{
        margin: "0.7em",
        padding: "0.5em",
        display: "inline",
        fontFamily: "Fira Sans, sans-serif",
        fontWeight: "400",
        fontSize: fontSize ? fontSize : "16px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    ></Typography>
  );
});

export default Language;
