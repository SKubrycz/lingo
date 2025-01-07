import { Box, Typography } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getBackground from "../../../../utilities/getBackground";

interface LessonsEditProps {}

export default function LessonsEdit({}: LessonsEditProps) {
  const { lessonId } = useParams();

  const { state } = useLocation();

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const res = await axios.get(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/admin/panel/lessons/edit/${lessonId}?language=${state.language}`
      );

      console.log(res.data);
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
