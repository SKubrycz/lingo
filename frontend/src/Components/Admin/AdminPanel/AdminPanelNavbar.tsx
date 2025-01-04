import { AppBar, Box, Typography } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

interface AdminPanelNavbarProps {}

export default function AdminPanelNavbar({}: AdminPanelNavbarProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar
      component="nav"
      position="fixed"
      elevation={trigger ? 4 : 0}
      sx={{
        padding: "1em 1.5em",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "primary.contrastText",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontFamily: "Fira Sans, sans-serif",
          fontWeight: "500",
          color: "primary.main",
        }}
      >
        LINGO
      </Typography>
      <Typography component="div" sx={{ color: "primary.main" }}>
        Wyloguj
      </Typography>
    </AppBar>
  );
}
