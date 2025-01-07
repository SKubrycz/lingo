import { Add, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import getBackground from "../../../../utilities/getBackground";
import axios, { isAxiosError } from "axios";

interface LessonsTabProps {
  lessonsData: any;
}

export default function LessonsTab({ lessonsData }: LessonsTabProps) {
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [tableData, setTableData] = useState<any[][]>([]);

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
    const newLessonId = lessonsData[lessonsData.length - 1].lessonId + 1;
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
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
      }
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
                  <IconButton>
                    <Edit></Edit>
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton>
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
  );
}
