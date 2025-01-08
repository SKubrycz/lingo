import { HelpOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface ExerciseType {
  name: string;
  description: string;
}

interface ExerciseDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ExerciseDialog({ open, onClose }: ExerciseDialogProps) {
  const [radioValue, setRadioValue] = useState<string>("");

  const possibleExerciseTypes: ExerciseType[] = [
    {
      name: "card",
      description: "Ćwiczenie wprowadzające nowe słowo do nauki",
    },
    {
      name: "input",
      description:
        "Ćwiczenie wymagające wypełnienia brakującego słowa lub tłumaczenia",
    },
    {
      name: "choice",
      description:
        "Ćwiczenie z trzema możliwymi wyborami tłumaczenia przedstawionego słowa",
    },
    {
      name: "match",
      description:
        "Ćwiczenie polegające na dobraniu pary słowa i jego tłumaczenia",
    },
  ];

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setRadioValue(target.value);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Box sx={{ margin: "1em" }}>
          <Typography variant="h6">Wybierz rodzaj ćwiczenia</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RadioGroup
              value={radioValue}
              onChange={handleRadioChange}
              sx={{ margin: "0.5em" }}
            >
              <FormControl>
                {possibleExerciseTypes &&
                  possibleExerciseTypes.map((el: ExerciseType, i: number) => {
                    return (
                      <FormControlLabel
                        key={i}
                        value={el.name}
                        control={<Radio></Radio>}
                        label={
                          <Box sx={{ display: "flex" }}>
                            <Typography>{el.name}</Typography>&nbsp;
                            <Tooltip
                              arrow
                              title={
                                <Typography
                                  variant="body2"
                                  sx={{ textAlign: "center", fontSize: "12px" }}
                                >
                                  {el.description}
                                </Typography>
                              }
                            >
                              <HelpOutline sx={{ color: "gray" }}></HelpOutline>
                            </Tooltip>
                          </Box>
                        }
                      ></FormControlLabel>
                    );
                  })}
              </FormControl>
            </RadioGroup>
            <Button variant="contained">Zatwierdź</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
