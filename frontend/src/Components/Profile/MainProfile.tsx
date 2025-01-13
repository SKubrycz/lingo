import { Avatar, Box, Container, Typography, Tooltip } from "@mui/material";

import { Settings } from "@mui/icons-material";

import MainProfileChart from "./MainProfileChart";
import PageTitle from "../Reusables/PageTitle/PageTitle";

import { useState } from "react";
import MainProfileStats from "./MainProfileStats";
import MainProfileSettings from "./MainProfileSettings";
import MainProfileLearnedWords from "./MainProfileLearnedWords";
import { User } from "./Profile";

interface MainProfileProps {
  user: User | null;
  languageData: any | null;
}

function MainProfile({ user, languageData }: MainProfileProps) {
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };
  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  return (
    <Container component="div">
      <PageTitle title="Profil"></PageTitle>
      <Container className="main-profile">
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Box sx={{ padding: "2em", display: "flex" }}>
            <Avatar
              sx={{
                width: 50,
                height: 50,
                bgcolor: "primary.dark",
              }}
            >
              {user?.login.charAt(0)}
            </Avatar>

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
                {user?.login}{" "}
                {user?.sessionUser
                  ? languageData.user.you
                    ? languageData.user.you
                    : "(Ty)"
                  : undefined}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 400, color: "primary.dark" }}
              >
                {`${
                  languageData?.user?.date
                    ? languageData?.user?.date
                    : "Data założenia konta"
                }:
                ${user?.createdDate ? user?.createdDate : "-"}`}
              </Typography>
            </Box>
            {user && user?.sessionUser && (
              <>
                <Tooltip
                  title={
                    languageData?.settings?.tooltip
                      ? languageData?.settings?.tooltip
                      : "Otwórz ustawienia użytkownika"
                  }
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
                  languageData={languageData?.settings}
                ></MainProfileSettings>
              </>
            )}
          </Box>
          <MainProfileChart
            stats={user?.stats}
            languageData={languageData?.chart}
          ></MainProfileChart>
        </Box>
        <Box sx={{ width: "66%", display: "flex", flexDirection: "column" }}>
          <MainProfileStats
            stats={user?.stats}
            languageData={languageData?.stats}
          ></MainProfileStats>
          {user?.sessionUser && (
            <MainProfileLearnedWords
              user={user}
              languageData={languageData?.newlyLearnedWords}
            ></MainProfileLearnedWords>
          )}
        </Box>
      </Container>
    </Container>
  );
}

export default MainProfile;
