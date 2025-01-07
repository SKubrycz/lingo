import { Add, Edit } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import getBackground from "../../../../utilities/getBackground";

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
    setTableData(data);
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
              Edytuj
            </TableCell>
            <TableCell>Dodaj tłumaczenie</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((el, i) => {
            return (
              <TableRow key={i}>
                {tableData[i].map((el, i) => {
                  if (Array.isArray(el) && el.length > 0)
                    return (
                      <TableCell
                        key={i}
                        sx={{ borderRight: "1px solid rgb(224,224,224)" }}
                      >
                        {el[0]}...
                      </TableCell>
                    );
                  else
                    return (
                      <TableCell
                        key={i}
                        sx={{ borderRight: "1px solid rgb(224,224,224)" }}
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}
