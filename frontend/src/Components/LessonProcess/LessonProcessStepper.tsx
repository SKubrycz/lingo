import { useState } from "react";

import { Stepper, Step, StepContent, LinearProgress } from "@mui/material";

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
      <Stepper activeStep={activeStep}>
        {[1, 2, 3, 4].map((step, index) => (
          <Step key={index}>Step{index + 1}</Step>
        ))}
      </Stepper>
    </>
  );
}

export default LessonProcessStepper;
