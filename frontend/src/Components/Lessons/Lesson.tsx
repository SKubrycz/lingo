import { useEffect } from "react";

import "./Lessons.scss";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
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
      <Card
        sx={{
          minWidth: "33%",
          margin: ".5em",
          display: "flex",
          justifyContent: "space-between",
          color: "#fff0e6",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">
              {lessonData.number} - {lessonData.title}
            </Typography>
            <Typography variant="body2">{lessonData.description}</Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
          <Button variant="text" sx={{ color: "primary.contrastText" }}>
            Rozpocznij
          </Button>
        </CardActions> */}
      </Card>
    </>
  );
}

export default Lesson;
