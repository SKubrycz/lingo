import {
  Avatar,
  Box,
  Container,
  Grid,
  Divider,
  Typography,
  Stack,
  ListItemButton,
  ListItemIcon,
  Tooltip,
} from "@mui/material";

import { Edit, Settings } from "@mui/icons-material";

import MainProfileChart from "./MainProfileChart";
import PageTitle from "../Reusables/PageTitle/PageTitle";

import { useEffect, useState } from "react";
import MainProfileStats from "./MainProfileStats";
import MainProfileSettings from "./MainProfileSettings";

interface User {
  login: string;
  createdDate: string;
  sessionUser: boolean;
}

function MainProfile({ user }: { user: User | null }) {
  const [avatarHover, setAvatarHover] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const handleAvatarHover = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.type === "mouseenter") {
      setAvatarHover(true);
    } else if (e.type === "mouseleave") {
      setAvatarHover(false);
    }
  };

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };
  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  return (
    <>
      <Container component="div">
        <PageTitle title="Profil"></PageTitle>
        <Grid container className="main-profile" columns={12}>
          <Grid item xs={8} sx={{ display: "block" }}>
            <Grid
              item
              xs={12}
              sx={{
                margin: "1em",
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
              }}
            >
              <Tooltip
                title="Kliknij aby zmienić zdjęcie profilowe"
                arrow={true}
              >
                <Avatar
                  onMouseEnter={handleAvatarHover}
                  onMouseLeave={handleAvatarHover}
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: "primary.dark",
                    cursor: "pointer",
                  }}
                >
                  {avatarHover ? <Edit></Edit> : user?.login.charAt(0)}
                </Avatar>
              </Tooltip>

              <Box
                component="div"
                sx={{
                  margin: "0 1em",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  {user?.login} {user?.sessionUser ? "(Ty)" : undefined}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 400, color: "primary.dark" }}
                >
                  {`Data założenia konta:
                ${user?.createdDate ? user?.createdDate : "-"}`}
                </Typography>
              </Box>
              {user && (
                /* Implement user settings, for example delete account, customization (also put Settings into other file) */
                <>
                  <Tooltip
                    title="Otwórz ustawienia użytkownika"
                    arrow={true}
                    onClick={() => handleOpenSettings()}
                  >
                    <Settings
                      sx={{
                        marginRight: ".5em",
                        marginLeft: "auto",
                        cursor: "pointer",
                        "&:hover": {
                          color: "primary.contrastText",
                        },
                      }}
                    ></Settings>
                  </Tooltip>
                  <MainProfileSettings
                    open={openSettings}
                    onClose={() => handleCloseSettings()}
                  ></MainProfileSettings>
                </>
              )}
            </Grid>
            <Grid item xs={12} sx={{ flexGrow: 3 }}>
              <Grid item xs={12} sx={{ margin: "1em" }}>
                <MainProfileChart></MainProfileChart>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <MainProfileStats></MainProfileStats>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MainProfile;
