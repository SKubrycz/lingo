import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemText,
  Typography,
  Stack,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";

import { LineChart } from "@mui/x-charts";

import {
  AccessTime,
  Done,
  Percent,
  Translate,
  QuestionMark,
} from "@mui/icons-material";

import PageTitle from "../Reusables/PageTitle/PageTitle";
import { useEffect, useState } from "react";

interface User {
  login: string;
  createdDate: string;
  sessionUser: boolean;
}

type StatData = number | string;

interface Stat {
  id: number;
  name: string;
  data: StatData;
}

function MainProfile({ user }: { user: User | null }) {
  const dataset = [
    { date: new Date(2024, 7, 1), count: 1 },
    { date: new Date(2024, 7, 2), count: 2 },
    { date: new Date(2024, 7, 3), count: 4 },
    { date: new Date(2024, 7, 4), count: 5 },
    { date: new Date(2024, 7, 5), count: 2 },
    { date: new Date(2024, 7, 6), count: 8 },
    { date: new Date(2024, 7, 7), count: 7 },
  ];

  const valueFormatter = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      month: "2-digit",
      day: "2-digit",
    });
  };

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
    <>
      <Container component="div">
        <PageTitle title="Profil"></PageTitle>
        <Grid container className="main-profile" columns={12}>
          <Grid item xs={8} sx={{ display: "block" }}>
            <Grid
              item
              xs={12}
              sx={{
                margin: "1em",
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
              }}
            >
              <Avatar sx={{ width: 50, height: 50, bgcolor: "primary.dark" }}>
                {user?.login.charAt(0)}
              </Avatar>
              <Box
                component="div"
                sx={{
                  margin: "0 1em",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  {user?.login} {user?.sessionUser ? "(Ty)" : undefined}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 400, color: "primary.dark" }}
                >
                  {`Data założenia konta:
                ${user?.createdDate ? user?.createdDate : "-"}`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ flexGrow: 3 }}>
              <Grid item xs={12} sx={{ margin: "1em" }}>
                <LineChart
                  dataset={dataset}
                  xAxis={[
                    {
                      dataKey: "date",
                      scaleType: "time",
                      valueFormatter,
                    },
                  ]}
                  series={[{ dataKey: "count" }]}
                  height={500}
                ></LineChart>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MainProfile;
