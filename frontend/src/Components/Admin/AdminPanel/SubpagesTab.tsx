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
import { Add, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface Metadata {
  route: string;
  language: string;
}

interface MergedMetadata {
  route: string;
  languages: string[];
}

interface SubpagesTabProps {
  subpagesData: any;
}

export default function SubpagesTab({ subpagesData }: SubpagesTabProps) {
  const [metadata, setMetadata] = useState<MergedMetadata[]>([]);

  const extractMetadata = (data: any[]) => {
    let metadata: Metadata[] = [];

    if (data) {
      data.forEach((el: any) => {
        metadata.push(el.metadata);
      });
    }

    const merged = metadata.reduce<{ [key: string]: MergedMetadata }>(
      (acc, { route, language }) => {
        if (!acc[route]) {
          acc[route] = { route, languages: [language] };
        } else {
          if (!acc[route].languages.includes(language)) {
            acc[route].languages.push(language);
          }
        }

        return acc;
      },
      {}
    );

    const result: MergedMetadata[] = Object.values(merged);
    return result;
  };

  useEffect(() => {
    console.log(subpagesData);

    const result = extractMetadata(subpagesData);
    setMetadata(result);
  }, [subpagesData]);

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
            <TableCell>Dodaj tłumaczenie</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {metadata.map((el, i) => {
            return (
              <TableRow key={i}>
                <TableCell sx={{ borderRight: "1px solid rgb(224,224,224)" }}>
                  {el.route}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid rgb(224,224,224)" }}>
                  {el.languages.map((elem, i) => {
                    if (el.languages.length - 1 !== i) return `${elem}, `;
                    else return elem;
                  })}
                </TableCell>
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
