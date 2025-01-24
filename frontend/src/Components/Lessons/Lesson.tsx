import { Link as RouterLink } from "react-router-dom";

import "./Lessons.scss";

import { Button, Box, Container, Typography } from "@mui/material";
import { Done } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setTimeStart } from "../../state/timeSpentSlice";
import { Buttons } from "./Lessons";

interface LessonData {
  lessonId: number;
  title: string;
  description: string;
  new_words: string[];
}

interface LessonProps {
  lessonData: LessonData;
  finished: boolean;
  buttons: Buttons | null;
}

function Lesson({ lessonData, finished, buttons }: LessonProps) {
  const dispatch = useDispatch();

  const startTimer = () => {
    console.log("lesson time measurement has been started");
    dispatch(setTimeStart({ timeStart: performance.now() }));
  };

  return (
    <>
      <Container
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box component="div">
          <Typography variant="h6">
            {lessonData.lessonId} - {lessonData.title}{" "}
            {finished && <Done color="success"></Done>}
          </Typography>
          <Typography variant="body2">{lessonData.description}</Typography>
        </Box>
        {finished ? (
          <Button
            to={`/lesson/${lessonData.lessonId}/1`}
            component={RouterLink}
            onClick={() => {
              startTimer();
            }}
            sx={{ color: "primary.contrastText", textDecoration: "none" }}
          >
            {buttons?.repeat ? buttons.repeat : "Powtórz lekcję"}
          </Button>
        ) : (
          <Button
            to={`/lesson/${lessonData.lessonId}/1`}
            component={RouterLink}
            onClick={() => {
              startTimer();
            }}
            sx={{ color: "primary.contrastText", textDecoration: "none" }}
          >
            {buttons?.begin ? buttons.begin : "Rozpocznij"}
          </Button>
        )}
      </Container>
    </>
  );
}

export default Lesson;
