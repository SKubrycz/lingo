import React, { useState } from "react";
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

export interface LessonData {
  id: number | undefined; //only id for now
}

interface LessonDataWithSession {
  exerciseId: number;
  exerciseCount: number;
  endSession: () => void;
  children: React.ReactNode;
}

function Stepper({
  exerciseId,
  exerciseCount,
  endSession,
  children,
}: LessonDataWithSession) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Container component="div" sx={{ display: "flex" }}>
        <Tooltip
          title="Zakończ lekcję"
          arrow
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -5],
                  },
                },
              ],
            },
          }}
        >
          <Icon
            component={Close}
            color="secondary"
            onClick={() => handleOpenDialog()}
            sx={{ paddingTop: "6px", cursor: "pointer" }}
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
          <LinearProgress
            variant="determinate"
            value={(exerciseId * 100) / exerciseCount}
            sx={{
              width: "100%",
            }}
          ></LinearProgress>
          <Box
            height={700}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {children}
          </Box>
        </Container>
        <Box
          sx={{
            width: "1em",
            height: "1em",
          }}
        >
          <Tooltip
            title="Postęp lekcji"
            arrow
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -8],
                    },
                  },
                ],
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                paddingTop: "6px",
                fontSize: "16px",
                fontWeight: 400,
                color: "secondary.main",
                cursor: "pointer",
              }}
            >
              {`${Math.round((exerciseId * 100) / exerciseCount)}%`}
            </Typography>
          </Tooltip>
        </Box>
      </Container>
    </>
  );
}

export default Stepper;
