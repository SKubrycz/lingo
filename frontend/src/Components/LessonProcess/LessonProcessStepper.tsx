import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Dialog,
  Icon,
  LinearProgress,
  Stepper,
  Step,
  Typography,
  Box,
  Tooltip,
  Button,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import { Close } from "@mui/icons-material";

interface LessonData {
  id: number; //only id for now
}

function LessonProcessStepper({ id }: LessonData) {
  const [activeStep, setActiveStep] = useState<number>(2);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const endSession = () => {
    navigate("/lessons");
  };

  return (
    <>
      <Container component="div" sx={{ display: "flex" }}>
        <Tooltip title="Zakończ lekcję">
          <Icon
            component={Close}
            color="secondary"
            onClick={() => handleOpenDialog()}
            sx={{ cursor: "pointer" }}
          />
        </Tooltip>
        <Dialog onClose={() => handleCloseDialog()} open={openDialog}>
          <Box component="div" padding="1em" textAlign="center">
            <DialogTitle>Czy na pewno chcesz opuścić lekcję?</DialogTitle>
            <DialogContent>
              <Typography variant="body2">
                Postęp nie zostanie zapisany
              </Typography>
            </DialogContent>
            <Box
              display="flex"
              justifyContent="space-around"
              onClick={() => endSession()}
            >
              <Button variant="contained" color="warning">
                Zakończ
              </Button>
              <Button variant="text" onClick={() => handleCloseDialog()}>
                Anuluj
              </Button>
            </Box>
          </Box>
        </Dialog>
        <Container
          component="main"
          sx={{
            height: "50%",
            margin: "1em 0",
          }}
        >
          <LinearProgress value={33} variant="determinate"></LinearProgress>
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
      </Container>
    </>
  );
}

export default LessonProcessStepper;
