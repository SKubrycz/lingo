import { Add, Edit, HelpOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import getBackground from "../../../../utilities/getBackground";
import axios, { isAxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

interface LessonsTabProps {
  lessonsData: any;
}

export default function LessonsTab({ lessonsData }: LessonsTabProps) {
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [tableData, setTableData] = useState<any[][]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<string | null>(null);

  const [modalData, setModalData] = useState<any | null>(null);

  const [textField, setTextField] = useState<string>("");
  const [newLanguageModal, setNewLanguageModal] = useState<boolean>(false);
  const [newLanguageModalData, setNewLanguageModalData] = useState<
    number | null
  >(null);

  const { state } = useLocation();

  const navigate = useNavigate();

  const convertLessonsData = () => {
    const keys = Object.keys(lessonsData[0]);
    setTableHeaders(keys);

    let data: any[] = [];
    for (let i = 0; i < lessonsData.length; i++) {
      data.push([]);
      keys.forEach((el) => {
        data[i].push(lessonsData[i][el]);
      });
    }

    data.sort((a, b) => a[0] - b[0]);

    setTableData(data);
  };

  const prepareNewLesson = async () => {
    const newLessonId = lessonsData.length + 1;
    if (!newLessonId) return;

    try {
      const res = await axios.post(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/admin/panel/lessons/add/${newLessonId}`,
        {},
        { withCredentials: true }
      );

      console.log(res.data);

      navigate(`/admin/panel/lessons/edit/${newLessonId}?language=pl`, {
        state: { language: "pl" },
      });
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
      }
    }
  };

  const handleDialogOpen = (index: number) => {
    setModalData({
      lessonId: tableData[index][0],
      languages: tableData[index][1],
    });
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setModalData(null);
    setRadioValue(null);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };

  const handleLanguageSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (modalData && modalData?.lessonId && radioValue) {
      try {
        const res = await axios.post(
          `http://localhost:${
            import.meta.env.VITE_SERVER_PORT
          }/admin/panel/lessons/edit/${
            modalData?.lessonId
          }?language=${radioValue}`,
          {},
          { withCredentials: true }
        );

        console.log(res.data);

        navigate(
          `/admin/panel/lessons/edit/${modalData?.lessonId}?language=${radioValue}`,
          {
            state: { language: radioValue },
          }
        );
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

  const handleNewLanguageModalOpen = (lessonId: number) => {
    setNewLanguageModalData(lessonId);
    setNewLanguageModal(true);
  };

  const handleNewLanguageModalClose = () => {
    setNewLanguageModal(false);
    setNewLanguageModalData(null);
  };

  const handleLanguageDialogSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (newLanguageModalData && textField) {
      try {
        const res = await axios.post(
          `http://localhost:${
            import.meta.env.VITE_SERVER_PORT
          }/admin/panel/lessons/add/language/${newLanguageModalData}?language=${textField}`,
          {},
          { withCredentials: true }
        );

        console.log(res.data);

        navigate(
          `/admin/panel/lessons/edit/${newLanguageModalData}?language=${textField}`
        );
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
        }
      }
    }
  };

  const handleLanguageTextField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= 2) {
      setTextField(e.target.value);
    } else {
      const cut = e.target.value.slice(0, -1);
      e.target.value = cut;
      setTextField(e.target.value);
    }
  };

  useEffect(() => {
    convertLessonsData();

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  useEffect(() => {
    console.log(tableData);
  }, [tableData]);

  return (
    <>
      <TableContainer
        sx={{
          width: "fit-content",
          borderLeft: "1px solid rgb(224,224,224)",
          borderRight: "1px solid rgb(224,224,224)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((el, i) => {
                return (
                  <TableCell
                    key={i}
                    sx={{ borderRight: "1px solid rgb(224,224,224)" }}
                  >
                    {el}
                  </TableCell>
                );
              })}
              <TableCell sx={{ borderRight: "1px solid rgb(224,224,224)" }}>
                Edytuj lekcję
              </TableCell>
              <TableCell>Dodaj tłumaczenie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((el, i) => {
              return (
                <TableRow key={i}>
                  {tableData[i].map((el, i) => {
                    if (Array.isArray(el) && el.length > 0) {
                      if (tableHeaders[i] !== "languages") {
                        return (
                          <TableCell
                            key={i}
                            sx={{ borderRight: "1px solid rgb(224,224,224)" }}
                          >
                            {el[0]}...
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={i}
                            sx={{ borderRight: "1px solid rgb(224,224,224)" }}
                          >
                            {el.map((elem, index) => {
                              if (el.length - 1 !== index) return `${elem},`;
                              else return elem;
                            })}
                          </TableCell>
                        );
                      }
                    } else
                      return (
                        <TableCell
                          key={i}
                          sx={{
                            maxWidth: "200px",
                            borderRight: "1px solid rgb(224,224,224)",
                          }}
                        >
                          {el}
                        </TableCell>
                      );
                  })}
                  <TableCell
                    align="center"
                    sx={{ borderRight: "1px solid rgb(224,224,224)" }}
                  >
                    <IconButton onClick={() => handleDialogOpen(i)}>
                      <Edit></Edit>
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleNewLanguageModalOpen(el[0])}
                    >
                      <Add></Add>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={tableHeaders.length + 2}>
                <Button onClick={() => prepareNewLesson()}>
                  <Add sx={{ fontSize: "20px" }}></Add>&nbsp;Stwórz nową lekcję
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleDialogClose}>
        <Box
          sx={{
            margin: "0.7em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" fontWeight={600}>
            Wybierz język dla lekcji nr {modalData?.lessonId}:
          </Typography>
          <RadioGroup value={radioValue} onChange={handleRadioChange}>
            <FormControl>
              {modalData &&
                modalData?.languages.map((el: string, i: number) => {
                  return (
                    <FormControlLabel
                      key={i}
                      value={el}
                      control={<Radio></Radio>}
                      label={
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <Typography
                            className={`fi fi-${el}`}
                            margin="0 0.5em"
                          ></Typography>
                          <Typography>{el}</Typography>
                        </Box>
                      }
                    ></FormControlLabel>
                  );
                })}
            </FormControl>
          </RadioGroup>
          <Button variant="contained" onClick={(e) => handleLanguageSubmit(e)}>
            Zatwierdź
          </Button>
        </Box>
      </Dialog>
      <Dialog open={newLanguageModal} onClose={handleNewLanguageModalClose}>
        <Box
          sx={{
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ display: "flex" }}>
            Dodaj tłumaczenie lekcji nr&nbsp;
            <span>
              <Typography variant="h6" color="primary.main">
                {newLanguageModalData}
              </Typography>
            </span>
          </Typography>
          <Typography variant="body1" marginTop="0.5em" color="gray">
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Wprowadź kod języka
              <Tooltip arrow title="Dwuliterowy kod języka wg. ISO 639-1">
                <HelpOutline></HelpOutline>
              </Tooltip>
            </span>
          </Typography>
          <TextField
            onChange={(e) => {
              handleLanguageTextField(e);
            }}
            sx={{
              "& .MuiInputBase-input": {
                textAlign: "center",
              },
            }}
          ></TextField>
          <Button
            variant="contained"
            onClick={(e) => handleLanguageDialogSubmit(e)}
          >
            Zatwierdź
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
