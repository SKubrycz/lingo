import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

import { Container, Box, Typography } from "@mui/material";
import { BarChart, QuestionAnswer, TaskAlt } from "@mui/icons-material";

import StartHome from "./StartHome";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";

import type { LanguageData } from "./Home";

interface MainHomeProps {
  languageData: LanguageData | null;
}

function MainHome({ languageData }: MainHomeProps) {
  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );

  return (
    <>
      <Container maxWidth={false} sx={{ maxWidth: "75%" }}>
        <Box className="home-main">
          <AlertSnackbar
            severity={alertSnackbarData.severity}
            variant={alertSnackbarData.variant}
            title={alertSnackbarData.title}
            content={alertSnackbarData.content}
          ></AlertSnackbar>
          <Box
            className="home-main-box"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TaskAlt
              sx={{
                paddingRight: "0.2em",
                fontSize: 120,
                color: "primary.contrastText",
              }}
            ></TaskAlt>
            <Box>
              <Typography variant="h3" sx={{ color: "primary.contrastText" }}>
                {languageData?.titles[0].title ?? "LINGO"}
              </Typography>
              <Typography variant="h6">
                {languageData?.titles[0].desc ??
                  "Nauka języka nigdy nie była prostsza!"}
              </Typography>
            </Box>
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Box
              className="home-main-box"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "100%", textAlign: "right" }}>
                <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
                  {languageData?.titles[1].title ?? "Sprawna nauka"}
                </Typography>
                <Typography variant="h6">
                  {languageData?.titles[1].desc ??
                    "Poznaj podstawy, zacznij rozmawiać"}
                </Typography>
              </Box>
              <QuestionAnswer
                sx={{
                  paddingLeft: "0.2em",
                  fontSize: 120,
                  color: "primary.contrastText",
                }}
              ></QuestionAnswer>
            </Box>
          </Box>
          <Box
            className="home-main-box"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <BarChart
              sx={{
                paddingRight: "0.2em",
                fontSize: 120,
                color: "primary.contrastText",
              }}
            ></BarChart>
            <Box>
              <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
                {languageData?.titles[2].title ?? "Widoczny postęp"}
              </Typography>
              <Typography variant="h6">
                {languageData?.titles[2].desc ??
                  "Monitoruj swój progres w nauce dzięki ekstensywnym statystykom"}
              </Typography>
            </Box>
          </Box>
          <StartHome
            buttonContainer={languageData?.buttonContainer}
          ></StartHome>
        </Box>
      </Container>
    </>
  );
}

export default MainHome;
