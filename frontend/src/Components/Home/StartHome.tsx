import { Link } from "react-router-dom";

import { Button, Box } from "@mui/material";

function StartHome() {
  return (
    <Box component="article" className="home-start">
      <p>Naucz się już teraz!</p>
      <Link to="/register">
        <Button variant="contained">Rozpocznij naukę</Button>
      </Link>
    </Box>
  );
}

export default StartHome;
