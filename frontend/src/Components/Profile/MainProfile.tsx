import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
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
    <Container component="div">
      <Box component="main" className="main-profile">
        <Card sx={{ minWidth: "55%", bgcolor: "primary.light" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ width: 50, height: 50, bgcolor: "primary.dark" }}>
                P
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
    </Container>
  );
}

export default MainProfile;
