import { Box, Container, Typography } from "@mui/material";

interface CardExProps {
  exerciseId: number | undefined;
  word: string | undefined;
  description: string | undefined;
}

export default function CardEx({ exerciseId, word, description }: CardExProps) {
  return (
    <>
      <Container
        sx={{
          width: "fit-content",
          height: "45%",
          minWidth: "100px",
          minHeight: "150px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "0.8s comeDown 1 ease-in-out",
        }}
      >
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
          <Typography variant="h5">{exerciseId}</Typography>
          <Typography variant="h6">{word}</Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            margin: "1em",
          }}
        >
          {description}
        </Typography>
      </Container>
    </>
  );
}
