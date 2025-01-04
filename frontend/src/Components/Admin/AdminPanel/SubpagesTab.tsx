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
import { Edit } from "@mui/icons-material";
import { useEffect } from "react";

interface SubpagesTabProps {
  subpagesData: any;
}

export default function SubpagesTab({ subpagesData }: SubpagesTabProps) {
  useEffect(() => {
    console.log(subpagesData);
  }, []);

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
            <TableCell>Podstrona</TableCell>
            <TableCell>Języki</TableCell>
            <TableCell>Edytuj</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>/</TableCell>
            <TableCell>pl, de</TableCell>
            <TableCell>
              <IconButton>
                <Edit></Edit>
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>/about</TableCell>
            <TableCell>pl, de</TableCell>
            <TableCell>
              <IconButton>
                <Edit></Edit>
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
