import React from "react";

import { Box, Button, Container, TextField, Typography } from "@mui/material";

interface InputMessageProps {
  correct: boolean | null;
  missingWords: string;
  exerciseUI: any | null;
}

function InputMessage({
  correct,
  missingWords,
  exerciseUI,
}: InputMessageProps) {
  switch (correct) {
    case true:
      return (
        <Typography variant="body1" color="success" sx={{ padding: "0.5em" }}>
          {exerciseUI?.correct ? exerciseUI?.correct : "Dobrze!"}
        </Typography>
      );
    case false:
      return (
        <Typography
          variant="body1"
          color="error"
          sx={{ padding: "0.5em", textAlign: "center" }}
        >
          {exerciseUI?.incorrect
            ? exerciseUI?.incorrect
            : "Źle, prawidłowa odpowiedź to:"}{" "}
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            {missingWords}
          </Typography>
        </Typography>
      );
    case null:
      return <>{""}</>;
    default:
      return <>{""}</>;
  }
}

interface InputExProps {
  question: string;
  exerciseUI: any | null;
  missingWords: string;
  correct: boolean | null;
  textRef: React.Ref<HTMLInputElement | null>;
  checkWords: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function InputEx({
  question,
  exerciseUI,
  missingWords,
  correct,
  textRef,
  checkWords,
}: InputExProps) {
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
          {exerciseUI?.task}
        </Typography>
        <TextField
          placeholder={
            exerciseUI?.placeholder ? exerciseUI?.placeholder : "Wypełnij pole"
          }
          variant="standard"
          inputRef={textRef}
          autoFocus={true}
          disabled={correct == null ? false : true}
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
          onClick={correct == null ? (e) => checkWords(e) : undefined}
          sx={{
            backgroundColor: "primary.contrastText",
          }}
        >
          {exerciseUI?.submit ? exerciseUI?.submit : "Sprawdź"}
        </Button>
        <InputMessage
          correct={correct}
          missingWords={missingWords}
          exerciseUI={exerciseUI}
        ></InputMessage>
      </Container>
    </Box>
  );
}
