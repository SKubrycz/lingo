import { Box, Typography } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import getBackground from "../../../../utilities/getBackground";

interface LessonsEditProps {}

export default function LessonsEdit({}: LessonsEditProps) {
  const { lessonId } = useParams();
  const [query] = useSearchParams();

  const { state } = useLocation();

  const navigate = useNavigate();

  const handleAuth = async () => {
    const language = query.get("language");

    if (lessonId && language) {
      try {
        const res = await axios.get(
          `http://localhost:${
            import.meta.env.VITE_SERVER_PORT
          }/admin/panel/lessons/edit/${lessonId}?language=${language}`,
          { withCredentials: true }
        );

        console.log(res.data);
      } catch (error) {
        console.error(error);

        if (isAxiosError(error)) {
        }
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
