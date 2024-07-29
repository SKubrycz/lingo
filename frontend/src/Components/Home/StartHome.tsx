import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

function StartHome() {
  return (
    <article className="home-start">
      <p>Naucz się już teraz!</p>
      <Link to="/register">
        <Button variant="contained">Rozpocznij naukę</Button>
      </Link>
    </article>
  );
}

export default StartHome;
