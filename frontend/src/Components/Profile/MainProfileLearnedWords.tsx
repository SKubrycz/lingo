import { useEffect, useRef, useState } from "react";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { User } from "./Profile";

interface WordData {
  id: number;
  word: string;
  leftValue: number;
}

interface MainProfileLearnedWordsProps {
  user: User;
}

function MainProfileLearnedWords({ user }: MainProfileLearnedWordsProps) {
  // And here static data for now
  const [wordData, setWordData] = useState<WordData[]>([
    {
      id: 0,
      word: user?.words[0],
      leftValue: 50 + 0 * 200,
    },
    {
      id: 1,
      word: user?.words[1],
      leftValue: 50 + 1 * 200,
    },
    {
      id: 2,
      word: user?.words[2],
      leftValue: 50 + 2 * 200,
    },
    {
      id: 3,
      word: user?.words[3],
      leftValue: 50 + 3 * 200,
    },
    {
      id: 4,
      word: user?.words[4],
      leftValue: 50 + 4 * 200,
    },
    {
      id: 5,
      word: user?.words[5],
      leftValue: 50 + 5 * 200,
    },
  ]);

  const [leftOffset, setLeftOffset] = useState<number>(0);
  const offsetStep = 200;
  const currentWord = useRef<number>(0); // wordData[i].id

  const interval = useRef<NodeJS.Timeout | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const buttonSx = {
    fontSize: 28,
    color: "gray",
    cursor: "pointer",
    "&:hover": {
      color: "primary.contrastText",
    },
  };

  const startSlideshow = (userInteracted: boolean) => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    if (!userInteracted) {
      interval.current = setInterval(() => {
        if (currentWord.current < 5) {
          goToNextWord(userInteracted);
        } else {
          resetToFirstWord();
        }
      }, 5000);
    } else if (userInteracted) {
      timeout.current = setTimeout(() => {
        interval.current = setInterval(() => {
          console.log(interval.current);
          if (currentWord.current < 5) {
            goToNextWord(false);
          } else {
            resetToFirstWord();
          }
        }, 5000);
      }, 10000);
    }
  };

  const resetToFirstWord = () => {
    const resetWordData = wordData.map((el, i) => {
      return el.id === i ? { ...el, leftValue: 50 + i * 200 } : el;
    });
    setWordData(resetWordData);

    currentWord.current = 0;
    setLeftOffset(0);
  };

  const goToPreviousWord = (click: boolean) => {
    if (click) startSlideshow(true);

    if (currentWord.current <= wordData.length - 1 && currentWord.current > 0) {
      setLeftOffset((leftOffset: number) => leftOffset + offsetStep);
    }
    currentWord.current--;
  };

  const goToNextWord = (click: boolean) => {
    if (click) startSlideshow(true);

    if (
      currentWord.current <= wordData.length - 1 &&
      currentWord.current >= 0
    ) {
      setLeftOffset((leftOffset: number) => leftOffset - offsetStep);
    }
    currentWord.current++;
  };

  useEffect(() => {
    const updatedWordData = wordData.map((el, i) => {
      return el.id === i ? { ...el, leftValue: 50 + i * 200 + leftOffset } : el;
    });

    setWordData(updatedWordData);
  }, [leftOffset]);

  useEffect(() => {
    startSlideshow(false);

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        marginTop: "3em",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <IconButton
        disabled={currentWord.current <= 0 ? true : false}
        onClick={() => goToPreviousWord(true)}
        sx={{
          "&:disabled": {
            opacity: 0,
          },
        }}
      >
        <KeyboardArrowLeft sx={buttonSx}></KeyboardArrowLeft>
      </IconButton>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          overflow: "hidden",
        }}
      >
        <Typography variant="body1">Nowo poznane słowa</Typography>
        <Box sx={{ width: "100%", height: "100%" }}>
          {wordData.map((el, i) => {
            return (
              <Box key={i}>
                <Typography
                  variant="h5"
                  noWrap={true}
                  fontWeight={600}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: `${el.leftValue}%`,
                    transform: "translate(-50%, -50%)",
                    transition: `left 500ms ease-in-out`,
                    color: "primary.contrastText",
                  }}
                >
                  {el.word}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
      <IconButton
        disabled={currentWord.current >= wordData.length - 1 ? true : false}
        onClick={() => goToNextWord(true)}
        sx={{
          "&:disabled": {
            opacity: 0,
          },
        }}
      >
        <KeyboardArrowRight sx={buttonSx}></KeyboardArrowRight>
      </IconButton>
    </Box>
  );
}

export default MainProfileLearnedWords;
