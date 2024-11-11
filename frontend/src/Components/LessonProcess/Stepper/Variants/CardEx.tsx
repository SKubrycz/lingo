import { Box, Container, Typography } from "@mui/material";
import { forwardRef } from "react";

interface CardExProps {
  exerciseId: number | undefined;
  word: string | undefined;
  translation: string | undefined;
  description: string | undefined;
}

interface CardExPropsRef extends CardExProps {
  cardRef: HTMLElement;
}

const CardEx = forwardRef<HTMLDivElement, CardExProps>(function CardEx(
  { exerciseId, word, translation, description },
  cardRef
) {
  return (
    <>
      <Container
        ref={cardRef}
        sx={{
          width: "fit-content",
          height: "60%",
          minWidth: "250px",
          minHeight: "150px",
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
          Nowe słowo
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
        <Typography
          variant="body1"
          sx={{
            margin: "1em",
          }}
        >
          <b>{translation}</b> {description ? `- ${description}` : undefined}
        </Typography>
      </Container>
    </>
  );
});

export default CardEx;
