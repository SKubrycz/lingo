import { Box } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useEffect } from "react";

interface LessonsTabProps {
  currentIndex: number;
  tabIndex: number;
}

export default function LessonsTab({
  currentIndex,
  tabIndex,
}: LessonsTabProps) {
  const fetchLessons = async () => {
    try {
      const res = await axios.get(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/admin/panel/lessons`,
        { withCredentials: true }
      );

      console.log(res.data);
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
      }
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return currentIndex === tabIndex ? <Box>Lessons Tab</Box> : undefined;
}
