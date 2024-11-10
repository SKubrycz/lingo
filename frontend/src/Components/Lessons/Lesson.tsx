import { Link as RouterLink } from "react-router-dom";

import "./Lessons.scss";

import { Button, Box, Container, Typography } from "@mui/material";

interface LessonData {
  number: number;
  title: string;
  description: string;
  new_words: string[];
}

interface LessonProps {
  lessonData: LessonData;
}

function Lesson({ lessonData }: LessonProps) {
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
            {lessonData.number} - {lessonData.title}
          </Typography>
          <Typography variant="body2">{lessonData.description}</Typography>
        </Box>
        <Button
          to={`/lesson/${lessonData.number}/1`}
          component={RouterLink}
          sx={{ color: "primary.contrastText", textDecoration: "none" }}
        >
          Rozpocznij
        </Button>
      </Container>
    </>
  );
}

export default Lesson;
