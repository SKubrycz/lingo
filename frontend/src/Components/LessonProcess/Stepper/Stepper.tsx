import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Dialog,
  Icon,
  LinearProgress,
  Typography,
  Box,
  Tooltip,
  Button,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import { Close } from "@mui/icons-material";
import StepperContent from "./StepperContent";

export interface LessonData {
  id: number | undefined; //only id for now
}

function Stepper({ id }: LessonData) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const navigate = useNavigate();

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
            <Box display="flex" justifyContent="space-around">
              <Button
                variant="contained"
                color="warning"
                onClick={() => endSession()}
              >
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
            width="100%"
            height={600}
            display="flex"
            justifyContent="center"
            alignItems="center"
            border="1px dashed"
            borderColor="primary.contrastText"
          >
            <StepperContent id={id}></StepperContent>
          </Box>
        </Container>
      </Container>
    </>
  );
}

export default Stepper;
