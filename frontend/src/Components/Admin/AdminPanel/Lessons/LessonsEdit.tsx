import { Box, Typography } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getBackground from "../../../../utilities/getBackground";

interface LessonsEditProps {}

export default function LessonsEdit({}: LessonsEditProps) {
  const { state } = useLocation();

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
      }
    }
  };

  useEffect(() => {
    handleAuth();

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  return (
    <>
      <Box>
        <Typography>LessonsEdit</Typography>
      </Box>
    </>
  );
}
