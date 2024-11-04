import { ArrowDownward } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function ScrollArrow() {
  return (
    <>
      <IconButton
        sx={{
          position: "fixed",
          left: "50%",
          top: "85%",
          transform: "translate(-50%, -50%)",
          animation: "3s bounce infinite",
        }}
        size={"large"}
        onClick={() => window.scrollTo(0, document.body.scrollHeight)}
      >
        <ArrowDownward></ArrowDownward>
      </IconButton>
    </>
  );
}
