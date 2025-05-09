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
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import getBackground from "../../../../utilities/getBackground";
import { LessonPanel } from "./LessonsTypes";
import { adminTheme } from "../../../../adminTheme";
import AdminPanelNavbar from "../AdminPanelNavbar";
import { ArrowBackIos, Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { setAlert } from "../../../../state/alertSnackbarSlice";
import AlertSnackbar from "../../../Reusables/Informational/AlertSnackbar";

interface DeleteDialogData {
  open: boolean;
  exerciseId: number | null;
}

interface LessonsEditProps {}

export default function LessonsEdit({}: LessonsEditProps) {
  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const [lessonData, setLessonData] = useState<LessonPanel | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogData>({
    open: false,
    exerciseId: null,
  });
  const { lessonId } = useParams();
  const [query] = useSearchParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

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

        setLessonData(res.data.result);
      } catch (error) {
        console.error(error);

        if (isAxiosError(error)) {
          if (error.status === 403) {
            navigate("/admin");
          } else {
            if (error.status && error.status > 399) {
              dispatch(
                setAlert({
                  severity: "error",
                  variant: "filled",
                  title: "Błąd",
                  content: error.response?.data.message,
                })
              );
            }

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

  const handleDeleteExercise = async (
    e: React.MouseEvent<HTMLButtonElement>,
    exerciseId: number | null
  ) => {
    e.preventDefault();

    const language = query.get("language");

    try {
      if (language && lessonId && exerciseId) {
        const res = await axios.delete(
          `http://localhost:${
            import.meta.env.VITE_SERVER_PORT
          }/admin/panel/lessons/creator/${lessonId}/${exerciseId}?language=${language}`,
          { withCredentials: true }
        );

        dispatch(
          setAlert({
            severity: "success",
            variant: "filled",
            title: "Sukces",
            content: res.data.message,
          })
        );

        navigate(0);
      }
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        if (error.status && error.status > 399) {
          dispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              title: "Błąd",
              content: error.response?.data.message,
            })
          );
        }
      }
    }
  };

  const submitChanges = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const language = query.get("language");

    if (lessonData && lessonId && language) {
      try {
        const res = await axios.put(
          `http://localhost:${
            import.meta.env.VITE_SERVER_PORT
          }/admin/panel/lessons/edit/${lessonId}?language=${language}`,
          lessonData,
          { withCredentials: true }
        );

        dispatch(
          setAlert({
            severity: "success",
            variant: "filled",
            title: "Sukces",
            content: res.data.message,
          })
        );
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
          if (error.status && error.status > 399) {
            dispatch(
              setAlert({
                severity: "error",
                variant: "filled",
                title: "Błąd",
                content: error.response?.data.message,
              })
            );
          }
        }
      }
    }
  };

  const updateLessonData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    if (!lessonData) return;
    if (Object.keys(lessonData).includes(key)) {
      const clone: LessonPanel = structuredClone(lessonData);
      switch (key) {
        case "title":
        case "description":
          clone[key] = e.target.value;
          break;
        default:
          break;
      }

      setLessonData(clone);
    }
  };

  const handleExerciseCreator = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const language = query.get("language");

    if (lessonData && language && lessonId) {
      try {
        navigate(
          `/admin/panel/lessons/creator/${lessonId}/${
            lessonData?.exercises.length + 1
          }?language=${language}`
        );
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
        }
      }
    }
  };

  const handleEditExercise = (
    e: React.MouseEvent<HTMLButtonElement>,
    exerciseId: number
  ) => {
    e.preventDefault();

    const language = query.get("language");

    if (lessonData && language && lessonId && exerciseId) {
      try {
        navigate(
          `/admin/panel/lessons/creator/${lessonId}/${exerciseId}?language=${language}`
        );
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
        }
      }
    }
  };

  const handleGoToAdminPanel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      navigate(`/admin/panel/`, { state: { fromAdmin: true } });
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
      }
    }
  };

  useEffect(() => {
    if (lessonData && lessonData?.exercises) {
      const lessonDataClone = structuredClone(lessonData);
      lessonDataClone.exerciseCount = lessonDataClone?.exercises.length;
      setLessonData(lessonDataClone);
    }
  }, []);

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
          <Box sx={{ width: "50%", marginBottom: "1em" }}>
            <Button onClick={handleGoToAdminPanel}>
              <ArrowBackIos sx={{ fontSize: "16px" }}></ArrowBackIos>Wróć do
              głównego menu
            </Button>
          </Box>
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
                value={lessonData ? lessonData?.title : ""}
                onChange={(e) => updateLessonData(e, "title")}
                fullWidth
                sx={{ margin: "0 0 1em 0", padding: 0 }}
              ></TextField>
              <Typography fontWeight={600}>Opis:</Typography>
              <TextField
                value={lessonData ? lessonData?.description : ""}
                onChange={(e) => updateLessonData(e, "description")}
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
                <b>Ilość ćwiczeń:</b>{" "}
                {lessonData ? lessonData?.exerciseCount : 0}
              </Typography>
              <Typography>
                <b>Język:</b> {lessonData ? lessonData?.language : "pl"}{" "}
                <span>
                  <Typography
                    className={`fi fi-${
                      lessonData ? lessonData?.language : "pl"
                    }`}
                    component="span"
                  ></Typography>
                </span>
              </Typography>

              <Typography>
                <b>Nowe słowa:</b>{" "}
                {lessonData && lessonData?.exercises.length > 0
                  ? lessonData?.exercises.map((el, i) => {
                      if (el.type === "card") {
                        if (i - 1 !== lessonData?.exercises.length)
                          return `${el.word}, `;
                        if (i - 1 === lessonData?.exercises.length)
                          return `${el.word}`;
                      }
                    })
                  : "-"}
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
                          <IconButton
                            onClick={(e) =>
                              handleEditExercise(e, el.exerciseId)
                            }
                          >
                            <Edit></Edit>
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() =>
                              handleDeleteDialogOpen(el.exerciseId)
                            }
                            disabled={
                              lessonData?.exercises.length - 1 !== i
                                ? true
                                : false
                            }
                            sx={{ "&:hover": { color: "red" } }}
                          >
                            <Delete></Delete>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                <TableRow>
                  <TableCell>
                    <Button onClick={(e) => handleExerciseCreator(e)}>
                      Dodaj ćwiczenie
                    </Button>
                  </TableCell>
                </TableRow>
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
              <Box marginTop="1em">
                <Button
                  variant="contained"
                  onClick={(e) =>
                    handleDeleteExercise(e, deleteDialog?.exerciseId)
                  }
                >
                  Tak
                </Button>
                <Button
                  onClick={handleDeleteDialogClose}
                  sx={{ color: "secondary.light" }}
                >
                  Nie
                </Button>
              </Box>
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
      <AlertSnackbar
        severity={alertSnackbarData.severity}
        variant={alertSnackbarData.variant}
        title={alertSnackbarData.title}
        content={alertSnackbarData.content}
      ></AlertSnackbar>
    </ThemeProvider>
  );
}
