import { Box } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useEffect } from "react";

interface SubpagesTabProps {
  currentIndex: number;
  tabIndex: number;
}

export default function SubpagesTab({
  currentIndex,
  tabIndex,
}: SubpagesTabProps) {
  const fetchSubpages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/admin/panel/subpages`,
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
    fetchSubpages();
  }, []);

  return currentIndex === tabIndex ? <Box>Something</Box> : undefined;
}
