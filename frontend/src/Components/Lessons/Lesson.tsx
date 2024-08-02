import { useEffect } from "react";

import "./Lessons.scss";

import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface LessonProps {
  lessonNumber: number;
  lessonDesc: string;
  lessonStyle: Object;
}

function Lesson({ lessonNumber, lessonDesc, lessonStyle }: LessonProps) {
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
            <Typography variant="h6">Lekcja {lessonNumber}</Typography>
            <Typography variant="body2">{lessonDesc}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default Lesson;
