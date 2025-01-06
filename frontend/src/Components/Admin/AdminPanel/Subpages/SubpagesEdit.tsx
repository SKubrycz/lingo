import { Box } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SubpagesEdit() {
  const { state } = useLocation();

  const handleAuth = async () => {
    if (
      state &&
      typeof state.route === "string" &&
      (state.route !== undefined || state.route !== null) &&
      state.language
    ) {
      // fetch specific route translation
      try {
        const res = await axios.get(
          `http://localhost:${
            import.meta.env.VITE_SERVER_PORT
          }/admin/panel/subpages/edit?route=${state.route}&language=${
            state.language
          }`,
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
  }, []);

  return <Box>SubpagesEdit</Box>;
}
