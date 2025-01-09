import {
  Box,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ExerciseRadio from "./ExerciseRadio";
import { adminTheme } from "../../../../adminTheme";
import getBackground from "../../../../utilities/getBackground";
import { HelpOutline } from "@mui/icons-material";

export type ExerciseType = "card" | "input" | "match" | "choice";

interface ChooseExerciseTypeProps {
  type: ExerciseType | null;
  exerciseId: string | undefined;
}

function ChooseExerciseType({ type, exerciseId }: ChooseExerciseTypeProps) {
  switch (type) {
    case "card":
      return (
        <Box>
          <Typography>
            <b>exerciseId:</b> {exerciseId}
          </Typography>
          <Typography marginBottom="1em">
            <b>Typ ćwiczenia:</b> {type}
          </Typography>
          <Typography>
            <b>Pytanie:</b>{" "}
          </Typography>
          <TextField></TextField>
          <Typography>
            <b>Tłumaczenie:</b>
          </Typography>
          <TextField></TextField>
          <Typography>
            <b>Opis:</b>
          </Typography>
          <TextField multiline rows={3}></TextField>
        </Box>
      );
    case "input":
      return (
        <Box>
          <Typography>
            <b>exerciseId:</b> {exerciseId}
          </Typography>
          <Typography marginBottom="1em">
            <b>Typ ćwiczenia:</b> {type}
          </Typography>
          <Typography>
            <b>Pytanie:</b>{" "}
          </Typography>
          <TextField></TextField>
          <Typography>
            <b>Zadanie:</b>
          </Typography>
          <TextField></TextField>
          <Typography>
            <b>Brakujące słowa:</b>
          </Typography>
          <TextField></TextField>
        </Box>
      );
    case "choice":
      return (
        <Box>
          <Typography>
            <b>exerciseId:</b> {exerciseId}
          </Typography>
          <Typography marginBottom="1em">
            <b>Typ ćwiczenia:</b> {type}
          </Typography>
          <Typography>
            <b>Zadanie:</b>{" "}
          </Typography>
          <TextField></TextField>
          <Typography>
            <b>Słowo:</b>
          </Typography>
          <TextField></TextField>
          <Typography>
            <b>Słowa do wyboru:</b>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            1: <TextField></TextField>
            2: <TextField></TextField>
            3: <TextField></TextField>
          </Box>
          <Typography>
            <b>Prawidłowa odpowiedź:</b>
          </Typography>
          <TextField></TextField>
        </Box>
      );
    case "match":
      return (
        <Box>
          <Typography>
            <b>exerciseId:</b> {exerciseId}
          </Typography>
          <Typography marginBottom="1em">
            <b>Typ ćwiczenia:</b> {type}
          </Typography>
          <Typography>
            <b>Zadanie:</b>
          </Typography>
          <TextField></TextField>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <b>Słowa: &nbsp;</b>
            <Tooltip
              arrow
              placement="right"
              title="Pary słów (słowo, tłumaczenie)"
            >
              <HelpOutline></HelpOutline>
            </Tooltip>
          </Box>
        </Box>
      );

    default:
      return (
        <Box>
          <Typography variant="body1">
            Nie wybrano żadnego rodzaju ćwiczenia z dostępnych
          </Typography>
        </Box>
      );
  }
}

interface ExerciseCreatorProps {}

export default function ExerciseCreator({}: ExerciseCreatorProps) {
  const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null);
  const { lessonId, exerciseId } = useParams();
  const [query] = useSearchParams();
  const { state } = useLocation();

  const navigate = useNavigate();

  const handleAuth = async () => {
    const language = query.get("language");

    if (!lessonId) navigate("/admin");
    if (!exerciseId) navigate("/admin");
    if (!language) navigate("/admin");

    try {
      const res = await axios.get(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/admin/panel/lessons/creator/${lessonId}/${exerciseId}?language=${language}`,
        { withCredentials: true }
      );

      console.log(res.data);
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        if (error.response?.status === 403) navigate("/admin");
      }
    }
  };

  const handleExerciseType = (type: ExerciseType) => {
    setExerciseType(type);
  };

  useEffect(() => {
    handleAuth();

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  return (
    <ThemeProvider theme={adminTheme}>
      <Box sx={{ width: "100%", height: "100vh", color: "primary.dark" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ChooseExerciseType
              type={exerciseType}
              exerciseId={exerciseId}
            ></ChooseExerciseType>
          </Box>
          <Box
            sx={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ExerciseRadio
              handleExerciseType={handleExerciseType}
            ></ExerciseRadio>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
