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
  Typography,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getBackground from "../../getBackground";

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
  const [open, setOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<MergedMetadata | null>(null);
  const [radioValue, setRadioValue] = useState<string>("");

  const navigate = useNavigate();

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

  const handleModalOpen = (data: MergedMetadata) => {
    setModalData(data);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
    // setModalData(null);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setRadioValue(target.value);
    console.log(`radio value: ${target.value}`);
  };

  const submitEdit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (
      radioValue &&
      modalData &&
      radioValue.length > 0 &&
      modalData.route.length > 0
    ) {
      const strippedRoute = modalData.route.slice(1);

      const stateData: Metadata = {
        route: strippedRoute,
        language: radioValue,
      };
      navigate("/admin/panel/subpages/edit", { state: stateData });
    }
  };

  useEffect(() => {
    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

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
                    <IconButton onClick={() => handleModalOpen(el)}>
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
      <Dialog open={open} onClose={handleModalClose}>
        <Box
          sx={{
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            margin="0 0 0.5em 0"
            sx={{ display: "flex" }}
          >
            Podstrona&nbsp;{" "}
            <span>
              <Typography variant="h6" sx={{ color: "primary.main" }}>
                {modalData?.route}
              </Typography>
            </span>
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            Wybierz język:
          </Typography>
          <RadioGroup value={radioValue} onChange={handleRadioChange}>
            <FormControl>
              {modalData?.languages &&
                modalData.languages.map((el, i) => {
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
          <Button
            variant="contained"
            onClick={(e) => submitEdit(e)}
            sx={{ margin: "0.3em" }}
          >
            Zatwierdź
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
