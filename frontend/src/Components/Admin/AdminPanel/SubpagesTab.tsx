import { Box } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useEffect } from "react";

interface SubpagesTabProps {}

export default function SubpagesTab({}: SubpagesTabProps) {
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

  return <Box sx={{ minWidth: "300px" }}>Something</Box>;
}
