import { useRef } from "react";

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Divider,
} from "@mui/material";

import {
  AccessTime,
  Done,
  Percent,
  Translate,
  QuestionMark,
} from "@mui/icons-material";

import type { Stats } from "../Profile/Profile";

type StatData = number | string;

interface Stat {
  id: number;
  type: string;
  name: string;
  desc: string;
  data: StatData;
}

const formatTimeSpent = (timeSpent: number | undefined): string => {
  if (timeSpent) {
    const seconds = 1000;
    const minutes = 60 * 1000;
    const hours = 60 * 60 * 1000;

    let timeStr = "";

    if (timeSpent < minutes) {
      timeStr = `${Math.floor(timeSpent / seconds)}s`;
    } else if (timeSpent >= minutes && timeSpent < hours) {
      timeStr = `${Math.floor(timeSpent / minutes)} min.`;
    } else if (timeSpent >= hours) {
      timeStr = `${Math.floor(timeSpent / hours)} godz.`;
    }

    return timeStr;
  }

  return "0";
};

interface MainProfileStatsProps {
  stats: Stats | undefined;
}

export default function MainProfileStats({ stats }: MainProfileStatsProps) {
  // IDEA: For stats add a tooltip with more information

  const myTime = useRef<number>(
    Math.floor(Math.random() * 1000 * 60 * 60 * 24)
  );
  const timeSpentLearning: number = Math.floor(
    myTime.current / (1000 * 60 * 60)
  );

  const listItemSx = {
    paddingTop: "1.5em",
    paddingBottom: "1.5em",
    display: "flex",
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: "primary.light",
      ".MuiListItemIcon-root": {
        color: "primary.contrastText",
      },
    },
  };

  //later to be replaced with API data
  const statsData: Stat[] = [
    {
      id: 1,
      type: "time_spent",
      name: "Czas spędzony na nauce",
      desc: "",
      data: formatTimeSpent(stats?.totalTimeSpent),
    },
    {
      id: 2,
      type: "lessons_finished",
      name: "Liczba ukończonych lekcji",
      desc: "",
      data: (stats?.finishedLessonsCount) ? stats?.finishedLessonsCount : 0,
    },
    {
      id: 3,
      type: "accuracy",
      name: "Dokładność w lekcjach",
      desc: "Procent poprawnych odpowiedzi (ze wszystkich lekcji)",
      data: (stats?.accuracy && stats?.accuracy > 0) ? `${String(stats?.accuracy).slice(0, 5)}%` : "-",
    },
    {
      id: 4,
      type: "words_learned",
      name: "Nauczone słowa",
      desc: "",
      data: (stats?.wordsLearned) ? stats?.wordsLearned : 0,
    },
    //{ id: 5, type: "something", name: "Coś", desc: "", data: 5863895672 },
  ]; //[1500, 123, "99%", 12.5, 5863895672];
  const listIcons = [AccessTime, Done, Percent, Translate, QuestionMark];

  return (
    <>
      <Stack
        divider={<Divider orientation="horizontal"></Divider>}
        sx={{
          width: "100%",
          minWidth: 360,
        }}
      >
        {statsData.map((value, index) => {
          const IconComponent = listIcons[index];
          return value.type === "accuracy" ? (
            <Tooltip
              title={value.desc}
              arrow={true}
              sx={{ textAlign: "center" }}
              key={index}
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -20],
                      },
                    },
                  ],
                },
              }}
            >
              <ListItem sx={listItemSx}>
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
            </Tooltip>
          ) : (
            <ListItem key={index} sx={listItemSx}>
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
      <Divider orientation="horizontal"></Divider>
    </>
  );
}
