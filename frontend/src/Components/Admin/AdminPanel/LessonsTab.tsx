import { Box } from "@mui/material";

interface LessonsTabProps {
  currentIndex: number;
  tabIndex: number;
}

export default function LessonsTab({
  currentIndex,
  tabIndex,
}: LessonsTabProps) {
  if (currentIndex === tabIndex) {
    return (
      <>
        <Box>Lessons Tab</Box>
      </>
    );
  }
}
