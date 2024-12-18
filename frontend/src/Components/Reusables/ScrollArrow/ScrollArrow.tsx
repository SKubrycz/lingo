import { useEffect, useRef } from "react";

import { ArrowDownward } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function ScrollArrow() {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const currentScrollHeight = useRef<number>(0);

  const handleScrollDown = () => {
    const step = 8;
    if (!interval.current) {
      currentScrollHeight.current = document.documentElement.scrollTop;

      interval.current = setInterval(() => {
        window.scrollTo(0, currentScrollHeight.current);
        currentScrollHeight.current += step;

        if (
          currentScrollHeight.current + step * 20 >=
            document.documentElement.scrollHeight &&
          interval.current
        ) {
          clearInterval(interval.current);
          interval.current = null;
        }
      }, 1000 / 240);
    }
  };

  useEffect(() => {
    document.addEventListener("wheel", () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    });

    return () => {
      document.removeEventListener("wheel", () => {
        if (interval.current) {
          clearInterval(interval.current);
          interval.current = null;
        }
      });
    };
  }, []);

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
        onClick={() => handleScrollDown()}
      >
        <ArrowDownward
          sx={{
            fontSize: 36,
          }}
        ></ArrowDownward>
      </IconButton>
    </>
  );
}
