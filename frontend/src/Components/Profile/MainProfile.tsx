import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
} from "@mui/material";

interface User {
  login: string;
  createdDate: string;
  sessionUser: boolean;
}

//later to be replaced with API data
const statsData: (string | number)[] = [1500, 123, "99%", 12.5, 5863895672];

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
            <Grid item xs={12} sx={{ background: "rgb(230, 92, 0)" }}>
              Somecontent
            </Grid>
            <Grid item xs={12}>
              Container2
            </Grid>
          </Grid>
          <Grid container xs={4}>
            <Grid xs={12} sx={{ background: "blue" }}>
              Another container
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MainProfile;
