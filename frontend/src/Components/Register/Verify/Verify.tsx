import axios from "axios";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box, Button, Input, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Verify() {
  const [code, setCode] = useState<string>("");
  const { verifyId } = useParams<{ verifyId: string | undefined }>();

  const navigate = useNavigate();

  const handleVerify = async () => {
    const res = await axios.get(
      `http://localhost:${process.env.REACT_APP_SERVER_PORT}/verify/${verifyId}`
    );
    console.log(res.data);
  };

  const submitCode = async (e: React.MouseEvent) => {
    e.preventDefault();

    const res = await axios.post(
      `http://localhost:${process.env.REACT_APP_SERVER_PORT}/verify/${verifyId}`,
      {
        verificationCode: code,
      }
    );
    console.log(res.data);

    console.log(`code ${code} submitted`);
  };

  useEffect(() => {
    if ((verifyId && verifyId.length < 32) || !verifyId) {
      navigate("/");
      return;
    }

    handleVerify();
  }, []);

  return (
    <>
      <Box>
        <Typography>
          Podaj kod weryfikacyjny, który wysłaliśmy ci na Twój email podany
          podczas rejestracji:
        </Typography>
        <Input type="text" onChange={(e) => setCode(e.target.value)}></Input>
        <Button
          type="submit"
          variant="contained"
          name="submit"
          value="Zatwierdź"
          sx={{
            margin: "1.5em .5em",
            backgroundColor: "primary.contrastText",
            "&.MuiButton-contained": {
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            },
          }}
          onClick={(e) => submitCode(e)}
        >
          Zatwierdź
        </Button>
      </Box>
    </>
  );
}
