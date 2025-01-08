import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import getBackground from "../../../../utilities/getBackground";
import { LessonPanel } from "./LessonsTypes";
import { adminTheme } from "../../../../adminTheme";
import AdminPanelNavbar from "../AdminPanelNavbar";
import { Delete, Edit } from "@mui/icons-material";

interface DeleteDialogData {
  open: boolean;
  exerciseId: number | null;
}

interface LessonsEditProps {}

export default function LessonsEdit({}: LessonsEditProps) {
  const [lessonData, setLessonData] = useState<LessonPanel | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogData>({
    open: false,
    exerciseId: null,
  });
  const { lessonId } = useParams();
  const [query] = useSearchParams();

  const { state } = useLocation();

  const navigate = useNavigate();

  const handleAuth = async () => {
    const language = query.get("language");

    if (lessonId && language) {
      try {
        const res = await axios.get(
          `http://localhost:${
            import.meta.env.VITE_SERVER_PORT
          }/admin/panel/lessons/edit/${lessonId}?language=${language}`,
          { withCredentials: true }
        );

        console.log(res.data);

        setLessonData(res.data?.result);
      } catch (error) {
        console.error(error);

        if (isAxiosError(error)) {
          if (error.response?.status === 403) {
            navigate("/admin");
          }
        }
      }
    }
  };

  const handleDeleteDialogOpen = (id: number) => {
    const dialogData: DeleteDialogData = {
      open: true,
      exerciseId: id,
    };
    setDeleteDialog(dialogData);
  };

  const handleDeleteDialogClose = () => {
    const dialogData: DeleteDialogData = {
      open: false,
      exerciseId: null,
    };
    setDeleteDialog(dialogData);
  };

  const submitChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    handleAuth();

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  return (
    <ThemeProvider theme={adminTheme}>
      <Box sx={{ width: "100%", height: "100vh", color: "primary.dark" }}>
        <Box
          sx={{
            width: "100%",
            marginTop: "5em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AdminPanelNavbar></AdminPanelNavbar>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ marginBottom: "2em" }}
          >
            Lekcja nr {lessonData?.lessonId}
          </Typography>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ width: "70%", marginRight: "2em" }}>
              <Typography fontWeight={600}>Tytuł:</Typography>
              <TextField
                value={lessonData?.title}
                fullWidth
                sx={{ margin: "0 0 1em 0", padding: 0 }}
              ></TextField>
              <Typography fontWeight={600}>Opis:</Typography>
              <TextField
                value={lessonData?.description}
                multiline
                rows={3}
                fullWidth
                sx={{ margin: 0, padding: 0 }}
              ></TextField>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridAutoFlow: "row",
                gridRowGap: "0.7em",
              }}
            >
              <Typography>
                <b>Ilość ćwiczeń:</b> {lessonData?.exerciseCount}
              </Typography>
              <Typography>
                <b>Język:</b> {lessonData?.language}
              </Typography>
              <Typography>
                <b>Nowe słowa:</b> {lessonData?.newWords.join(", ")}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "50%", margin: "1em 1em 5em 1em" }}>
            <Table sx={{ border: "1px solid rgb(224, 224, 224)" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ borderRight: "1px solid rgb(224, 224, 224)" }}
                  >
                    exerciseId
                  </TableCell>
                  <TableCell
                    sx={{ borderRight: "1px solid rgb(224, 224, 224)" }}
                  >
                    type
                  </TableCell>
                  <TableCell
                    sx={{ borderRight: "1px solid rgb(224, 224, 224)" }}
                  >
                    Edytuj
                  </TableCell>
                  <TableCell
                    sx={{ borderRight: "1px solid rgb(224, 224, 224)" }}
                  >
                    Usuń
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lessonData &&
                  lessonData?.exercises.map((el, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell
                          sx={{ borderRight: "1px solid rgb(224, 224, 224)" }}
                        >
                          {el.exerciseId}
                        </TableCell>
                        <TableCell
                          sx={{ borderRight: "1px solid rgb(224, 224, 224)" }}
                        >
                          {el.type}
                        </TableCell>
                        <TableCell
                          sx={{ borderRight: "1px solid rgb(224, 224, 224)" }}
                        >
                          <IconButton>
                            <Edit></Edit>
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() =>
                              handleDeleteDialogOpen(el.exerciseId)
                            }
                            sx={{ "&:hover": { color: "red" } }}
                          >
                            <Delete></Delete>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Box>
          <Dialog open={deleteDialog.open} onClose={handleDeleteDialogClose}>
            <Box
              sx={{
                margin: "1em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Usunięcie ćwiczenia</Typography>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                Czy na pewno chcesz usunąć ćwiczenie nr{" "}
                <b>{deleteDialog?.exerciseId}</b>? <br></br>Ta akcja jest{" "}
                <b>bezpowrotna!</b>
              </Typography>
            </Box>
          </Dialog>
        </Box>
      </Box>
      <AppBar
        position="fixed"
        sx={{
          padding: "1em 1.5em",
          top: "auto",
          bottom: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "primary.contrastText",
        }}
      >
        <Typography variant="body1" color="primary.main">
          Zapisz zmiany:
        </Typography>
        <Button variant="contained" onClick={(e) => submitChanges(e)}>
          Zatwierdź
        </Button>
      </AppBar>
    </ThemeProvider>
  );
}
