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

import {
  AccessTime,
  Done,
  Percent,
  Translate,
  QuestionMark,
} from "@mui/icons-material";

interface User {
  login: string;
  createdDate: string;
  sessionUser: boolean;
}

interface Stat {
  id: number;
  name: string;
  data: number;
}

//later to be replaced with API data
const statsData: Stat[] = [
  { id: 1, name: "Czas spędzony na nauce", data: 1500 },
  { id: 2, name: "Liczba ukończonych lekcji", data: 123 },
  { id: 3, name: "Dokładność w lekcjach", data: 99.5 },
  { id: 4, name: "Nauczone słowa", data: 12.5 },
  { id: 5, name: "Coś", data: 5863895672 },
]; //[1500, 123, "99%", 12.5, 5863895672];
const listIcons = [AccessTime, Done, Percent, Translate, QuestionMark];

function MainProfile({ user }: { user: User | null }) {
  return (
    <>
      {/*       <Container component="div">
        <Box component="main" className="main-profile">
          <Card sx={{ minWidth: "55%" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ width: 50, height: 50, bgcolor: "primary.dark" }}>
                  {user?.login.charAt(0)}
                </Avatar>
              }
              title={
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  {user?.login} {user?.sessionUser ? "(Ty)" : undefined}
                </Typography>
              }
              subheader={`Data założenia konta: ${
                user?.createdDate ? user?.createdDate : "-"
              }`}
              sx={{
                padding: "2em",
              }}
            ></CardHeader>
            <CardContent>
              <List
                sx={{
                  width: "100%",
                  minWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {statsData.map((value, index) => {
                  return (
                    <Box key={index}>
                      <ListItemButton>
                        <ListItem
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <ListItemText
                            primary={`Stat${index + 1}:`}
                          ></ListItemText>
                          <ListItemText
                            primary={value}
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          ></ListItemText>
                        </ListItem>
                      </ListItemButton>
                      {!(statsData.length - 1 === index) ? (
                        <Divider></Divider>
                      ) : null}
                    </Box>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Container> */}
      <Container component="div">
        <Grid container className="main-profile" columns={12}>
          <Grid container xs={8}>
            <Grid
              item
              xs={12}
              sx={{
                margin: "1em",
                display: "flex",
                flexDirection: "row",
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
                  justifyContent: "center",
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
            <Grid item xs={12}>
              {" "}
              <Grid item xs={12} sx={{ margin: "1em" }}>
                {/*<insert some chart or data diagram here (in the future)>*/}
                Data
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={4}>
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
