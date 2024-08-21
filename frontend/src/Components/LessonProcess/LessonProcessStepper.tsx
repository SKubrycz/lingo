import { useState } from "react";

import {
  Container,
  LinearProgress,
  Stepper,
  Step,
  Typography,
  Box,
} from "@mui/material";

interface LessonData {
  id: number; //only id for now
}

function LessonProcessStepper({ id }: LessonData) {
  const [activeStep, setActiveStep] = useState<number>(2);

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  return (
    <>
      <LinearProgress value={33} variant="determinate"></LinearProgress>
      <Container component="main" sx={{ height: "50%", margin: "1em 0" }}>
        <Box
          height={600}
          display="flex"
          justifyContent="center"
          alignItems="center"
          border="1px dashed"
          borderColor="primary.contrastText"
        >
          <Typography variant="h6">LESSON CONTENT</Typography>
        </Box>
      </Container>
    </>
  );
}

export default LessonProcessStepper;
