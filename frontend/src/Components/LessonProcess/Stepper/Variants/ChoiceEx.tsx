import { Box, Button, Typography } from "@mui/material";

interface ChoiceMessageProps {
  correct: boolean | null;
  answer: string;
}

function ChoiceMessage({ correct, answer }: ChoiceMessageProps) {
  switch (correct) {
    case true:
      return (
        <Typography variant="body1" color="success" sx={{ padding: "0.5em" }}>
          Dobrze!
        </Typography>
      );
    case false:
      return (
        <Typography
          variant="body1"
          color="error"
          sx={{ padding: "0.5em", textAlign: "center" }}
        >
          Źle, prawidłowa odpowiedź to:{" "}
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            {answer}
          </Typography>
        </Typography>
      );
    case null:
      return <>{""}</>;
    default:
      return <>{""}</>;
  }
}

interface ChoiceExProps {
  task: string;
  word: string;
  words: string[];
  answer: string;
  correct: boolean | null;
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ChoiceEx({
  task,
  word,
  words,
  answer,
  correct,
  checkAnswer,
}: ChoiceExProps) {
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
      <Typography variant="h6" sx={{ padding: "1.5em 0 0.7em 0" }}>
        {task}:
      </Typography>
      <Typography
        variant="h5"
        fontWeight="600"
        color="primary.contrastText"
        sx={{ margin: "0 0 1em 0" }}
      >
        {word}
      </Typography>
      <Box width="25%">
        {words &&
          words.map((el, i) => {
            return (
              <Button
                fullWidth
                variant="contained"
                key={i}
                onClick={(e) => checkAnswer(e)}
                sx={{
                  margin: "0.5em 0",
                  backgroundColor: "primary.contrastText",
                }}
              >
                {el}
              </Button>
            );
          })}
      </Box>
      <ChoiceMessage correct={correct} answer={answer}></ChoiceMessage>
    </Box>
  );
}
