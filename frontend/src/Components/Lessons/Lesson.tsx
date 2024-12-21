import { Link as RouterLink } from "react-router-dom";

import "./Lessons.scss";

import { Button, Box, Container, Typography } from "@mui/material";
import { Done } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setTimeStop } from "../../state/timeSpentSlice";

interface LessonData {
  lessonId: number;
  title: string;
  description: string;
  new_words: string[];
}

interface LessonProps {
  lessonData: LessonData;
  finished: boolean;
}

function Lesson({ lessonData, finished }: LessonProps) {
  const dispatch = useDispatch();

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
            sx={{ color: "primary.contrastText", textDecoration: "none" }}
            onClick={() =>
              dispatch(setTimeStop({ timeStop: performance.now() }))
            }
          >
            Powtórz lekcję
          </Button>
        ) : (
          <Button
            to={`/lesson/${lessonData.lessonId}/1`}
            component={RouterLink}
            onClick={() =>
              dispatch(setTimeStop({ timeStop: performance.now() }))
            }
            sx={{ color: "primary.contrastText", textDecoration: "none" }}
          >
            Rozpocznij
          </Button>
        )}
      </Container>
    </>
  );
}

export default Lesson;
