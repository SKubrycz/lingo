import { Box } from "@mui/material";

interface ChoiceExProps {
  question: string;
  task: string;
  //words
  missingWords: string;
  correct: boolean | null;
}

export default function ChoiceEx({}: ChoiceExProps) {
  return <Box></Box>;
}
