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

import MainProfileChart from "./MainProfileChart";
import PageTitle from "../Reusables/PageTitle/PageTitle";

import { useEffect, useState } from "react";
import MainProfileStats from "./MainProfileStats";

interface User {
  login: string;
  createdDate: string;
  sessionUser: boolean;
}

function MainProfile({ user }: { user: User | null }) {
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
                <MainProfileChart></MainProfileChart>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <MainProfileStats></MainProfileStats>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MainProfile;
