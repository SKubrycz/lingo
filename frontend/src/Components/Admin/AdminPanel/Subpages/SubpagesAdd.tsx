import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import getBackground from "../../getBackground";

export default function SubpagesAdd() {
  useEffect(() => {
    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  return (
    <Box>
      <Typography variant="h6" color="primary.main">
        SubpagesAdd
      </Typography>
    </Box>
  );
}
