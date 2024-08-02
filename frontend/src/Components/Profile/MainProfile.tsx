import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";

interface User {
  login: string;
  sessionUser: boolean;
}

//later to be replaced with API data
const statsData: (string | number)[] = [1500, 123, "99%", 12.5, 5863895672];

function MainProfile({ user }: { user: User | null }) {
  return (
    <Container component="div">
      <Box component="main" className="main-profile">
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                {user?.login} {user?.sessionUser ? "(Ty)" : undefined}
              </Typography>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {statsData.map((value, index) => {
                  return (
                    <ListItem>
                      Stat{index + 1}: {value}
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Container>
  );
}

export default MainProfile;
