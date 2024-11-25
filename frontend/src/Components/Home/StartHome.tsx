import { Link } from "react-router-dom";

import { Button, Box } from "@mui/material";
import { HomeButtonContainer } from "./Home";

interface StartHomeProps {
  buttonContainer: HomeButtonContainer | undefined;
}

function StartHome({ buttonContainer }: StartHomeProps) {
  return (
    <Box component="article" className="home-start">
      <p>{buttonContainer?.subtitle ?? "Naucz się już teraz!"}</p>
      <Link to="/register">
        <Button variant="contained">
          {buttonContainer?.button ?? "Rozpocznij naukę"}
        </Button>
      </Link>
    </Box>
  );
}

export default StartHome;
