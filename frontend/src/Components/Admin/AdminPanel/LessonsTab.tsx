import { ConstructionOutlined } from "@mui/icons-material";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";

interface LessonsTabProps {}

export default function LessonsTab({}: LessonsTabProps) {
  const [lessonsData, setLessonsData] = useState<any[]>([]);
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [tableData, setTableData] = useState<any[][]>([]);

  const fetchLessons = async () => {
    try {
      const res = await axios.get(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/admin/panel/lessons`,
        { withCredentials: true }
      );

      console.log(res.data);

      const keys = Object.keys(res.data[0]);
      setTableHeaders(keys);

      let data: any[] = [];
      console.log(data);
      for (let i = 0; i < res.data.length; i++) {
        data.push([]);
        keys.forEach((el) => {
          data[i].push(res.data[i][el]);
        });
        console.log(tableData);
      }
      setTableData(data);
      console.log(`tableData: `);
      console.log(tableData);
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
      }
    }
  };

  useEffect(() => {
    fetchLessons();
    console.log(tableData);
  }, []);

  return (
    <TableContainer sx={{ width: "fit-content" }}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((el, i) => {
              return <TableCell key={i}>{el}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((el, i) => {
            return (
              <TableRow key={i}>
                {tableData[i].map((el, i) => {
                  if (Array.isArray(el))
                    return <TableCell key={i}>{el[0]}...</TableCell>;
                  else return <TableCell key={i}>{el}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
