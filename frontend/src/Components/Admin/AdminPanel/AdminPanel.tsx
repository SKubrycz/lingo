import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!state || !state.hasOwnProperty("fromAdmin")) navigate("/");
  }, []);

  return (
    <>
      <Typography>Admin Panel</Typography>
    </>
  );
}
