import { Box } from "@mui/material";

interface SubpagesTabProps {
  currentIndex: number;
  tabIndex: number;
}

export default function SubpagesTab({
  currentIndex,
  tabIndex,
}: SubpagesTabProps) {
  if (currentIndex === tabIndex) {
    return (
      <>
        <Box>Something</Box>
      </>
    );
  }
}
