import { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import "./Lessons.scss";

import {
  Button,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
  Stack,
} from "@mui/material";

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
  useEffect(() => {
    /*
            some fetch-lessons logic here (maybe, or: fetching from parent component)
        */
  }, []);

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
          to={`/lesson/${lessonData.number}`}
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
