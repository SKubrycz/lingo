import { useState } from "react";

import { Box, Container, TextField, Typography } from "@mui/material";

interface InputExProps {
  question: string;
  task: string;
  missingWords: string;
}

export default function InputEx({
  question,
  task,
  missingWords,
}: InputExProps) {
  const [correct, setCorrect] = useState<boolean>(false);

  const checkWords = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    if (!correct) {
      if (e.target.value.toLowerCase() === missingWords) {
        setCorrect(true);
        console.log("correct!");
      } else {
        setCorrect(false);
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "55%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          width: "fit-content",
          height: "70%",
          minWidth: "260px",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "0.8s comeDown 1 ease-in-out",
        }}
      >
        <Typography variant="h6" sx={{ padding: "0.7em 0" }}>
          {question}
        </Typography>
        <Typography variant="body2" sx={{ color: "secondary.main" }}>
          {task}
        </Typography>
        <TextField
          placeholder="Wypełnij pole"
          variant="standard"
          autoFocus={true}
          onChange={(e) => checkWords(e)}
          inputProps={{
            maxLength: 30,
          }}
          disabled={correct}
          sx={{
            padding: "0.5em",
            ".MuiInputBase-input": {
              padding: "0.5em",
              textAlign: "center",
            },
          }}
        ></TextField>
        {correct ? "Dobrze!" : ""}
      </Container>
    </Box>
  );
}
