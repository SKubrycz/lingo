import { useEffect } from "react";

import "./Lessons.scss";

import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

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
      <Card sx={{ maxWidth: "50%", margin: ".5em" }}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">
              Lekcja {lessonData.number} - {lessonData.title}
            </Typography>
            <Typography variant="body2">{lessonData.description}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default Lesson;
