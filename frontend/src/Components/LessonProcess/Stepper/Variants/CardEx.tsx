import { Box, Container, Typography } from "@mui/material";
import { forwardRef } from "react";

interface CardExProps {
  exerciseId: number | undefined;
  exerciseUI: any | undefined;
  word: string | undefined;
  translation: string | undefined;
  description: string | undefined;
}

const CardEx = forwardRef<HTMLDivElement, CardExProps>(function CardEx(
  { exerciseId, exerciseUI, word, translation, description },
  cardRef
) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "55%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        ref={cardRef}
        sx={{
          width: "fit-content",
          height: "70%",
          minWidth: "260px",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "0.8s comeDown 1 ease-in-out",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "secondary.main",
            fontWeight: 300,
          }}
        >
          {exerciseUI?.title ? exerciseUI?.title : "Nowe słowo"}
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            padding: "0.1em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            borderRadius: "5px",
            color: "primary.main",
            backgroundColor: "primary.contrastText",
          }}
        >
          {/* <Typography variant="h5">{exerciseId}</Typography> */}
          <Typography variant="h6">{word}</Typography>
        </Box>
      </Container>
      <Typography
        variant="body1"
        sx={{
          margin: "1em",
        }}
      >
        <b>{translation}</b> {description ? `- ${description}` : undefined}
      </Typography>
    </Box>
  );
});

export default CardEx;
