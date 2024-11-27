import { useRef, useEffect } from "react";

import { Box, Button, Container, TextField, Typography } from "@mui/material";

interface InputExProps {
  question: string;
  task: string;
  missingWords: string;
  correct: boolean;
  setCorrect: (correct: boolean) => void;
}

export default function InputEx({
  question,
  task,
  missingWords,
  correct,
  setCorrect,
}: InputExProps) {
  const textRef = useRef<HTMLInputElement | null>(null);

  const checkWords = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement>
      | KeyboardEvent,
    clicked: boolean
  ) => {
    e.preventDefault();

    if (!correct && textRef.current) {
      if (textRef.current.value.toLowerCase() === missingWords && clicked) {
        setCorrect(true);
        console.log("correct!");
      } else {
        setCorrect(false);
      }
    }
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.value = "";
      setCorrect(false);
    }

    console.log(missingWords);
  }, [missingWords]);

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
        <Typography variant="h6" sx={{ padding: "1.5em 0 0.7em 0" }}>
          {question}
        </Typography>
        <Typography variant="body2" sx={{ color: "secondary.main" }}>
          {task}
        </Typography>
        <TextField
          placeholder="Wypełnij pole"
          variant="standard"
          inputRef={textRef}
          autoFocus={true}
          onChange={(e) => checkWords(e, false)}
          disabled={correct}
          sx={{
            padding: "1em 1em 0.3em 1em",
            ".MuiInputBase-input": {
              padding: "0.5em",
              textAlign: "center",
            },
          }}
        ></TextField>
        <Button
          variant="contained"
          className="button-contained"
          onClick={(e) => checkWords(e, true)}
          sx={{
            backgroundColor: "primary.contrastText",
          }}
        >
          Sprawdź
        </Button>
        {correct ? (
          <Typography variant="body1" color="success" sx={{ padding: "0.5em" }}>
            Dobrze!
          </Typography>
        ) : (
          ""
        )}
      </Container>
    </Box>
  );
}
