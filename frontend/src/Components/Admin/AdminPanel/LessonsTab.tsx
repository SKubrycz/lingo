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
import { useEffect } from "react";

interface LessonsTabProps {}

function LessonsTable() {
  return (
    <TableContainer sx={{ width: "fit-content" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>LessonId</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function LessonsTab({}: LessonsTabProps) {
  const fetchLessons = async () => {
    try {
      const res = await axios.get(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/admin/panel/lessons`,
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
    fetchLessons();
  }, []);

  return <LessonsTable></LessonsTable>;
}
