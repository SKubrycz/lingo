import { HelpOutline } from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { adminTheme } from "../../../../adminTheme";
import type { ExerciseType } from "./ExerciseCreator";

interface ExerciseInfo {
  name: ExerciseType;
  description: string;
}

interface ExerciseDialogProps {
  handleExerciseType: (type: ExerciseType) => void;
}

export default function ExerciseRadio({
  handleExerciseType,
}: ExerciseDialogProps) {
  const [radioValue, setRadioValue] = useState<ExerciseType | string>("");

  const possibleExerciseTypes: ExerciseInfo[] = [
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
    handleExerciseType(target.value as ExerciseType);
  };

  return (
    <ThemeProvider theme={adminTheme}>
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
                possibleExerciseTypes.map((el: ExerciseInfo, i: number) => {
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
                            placement="right"
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
        </Box>
      </Box>
    </ThemeProvider>
  );
}
