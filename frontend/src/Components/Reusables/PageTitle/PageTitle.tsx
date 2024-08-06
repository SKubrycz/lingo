import { Typography } from "@mui/material";

interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <Typography
      variant="h5"
      sx={{ padding: ".5em", textAlign: "center", fontWeight: "500" }}
    >
      {title}
    </Typography>
  );
}
