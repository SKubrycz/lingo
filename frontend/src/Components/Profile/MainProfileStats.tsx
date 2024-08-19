import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Divider,
} from "@mui/material";

import {
  AccessTime,
  Done,
  Percent,
  Translate,
  QuestionMark,
} from "@mui/icons-material";

type StatData = number | string;

interface Stat {
  id: number;
  name: string;
  data: StatData;
}

export default function MainProfileStats() {
  // IDEA: For stats add a tooltip with more information

  const myTime: number = Math.floor(Math.random() * 1000 * 60 * 60 * 24);
  const timeSpentLearning: number = Math.floor(myTime / (1000 * 60 * 60));

  //later to be replaced with API data
  const statsData: Stat[] = [
    {
      id: 1,
      name: "Czas spędzony na nauce",
      data: `${timeSpentLearning} godz.`,
    },
    { id: 2, name: "Liczba ukończonych lekcji", data: 123 },
    { id: 3, name: "Dokładność w lekcjach", data: `${99.5}%` },
    { id: 4, name: "Nauczone słowa", data: 12 },
    { id: 5, name: "Coś", data: 5863895672 },
  ]; //[1500, 123, "99%", 12.5, 5863895672];
  const listIcons = [AccessTime, Done, Percent, Translate, QuestionMark];

  return (
    <Stack
      divider={<Divider orientation="horizontal"></Divider>}
      sx={{
        width: "100%",
        minWidth: 360,
      }}
    >
      {statsData.map((value, index) => {
        const IconComponent = listIcons[index];
        return (
          <ListItem
            key={index}
            sx={{
              paddingTop: "1.2em",
              paddingBottom: "1.2em",
              display: "flex",
              justifyContent: "space-between",
              "&:hover": {
                backgroundColor: "primary.light",
                ".MuiListItemIcon-root": {
                  color: "primary.contrastText",
                },
              },
            }}
          >
            <ListItemIcon>
              <IconComponent></IconComponent>
            </ListItemIcon>
            <ListItemText primary={value.name}></ListItemText>
            <ListItemText
              primary={value.data}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                fontSize: 24,
              }}
            ></ListItemText>
          </ListItem>
        );
      })}
    </Stack>
  );
}
