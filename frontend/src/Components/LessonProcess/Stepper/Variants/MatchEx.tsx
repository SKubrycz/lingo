import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { shuffleArray } from "../../../../utilities/shuffleArray";

interface MatchExProps {
  task: string;
  words: string[][];
  checkWords: (words: string[], pairsMatched: number) => void;
}

export default function MatchEx({ task, words, checkWords }: MatchExProps) {
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [shuffledTranslations, setShuffledTranslations] = useState<string[]>(
    []
  );
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [disabled, setDisabled] = useState<number[][]>([[], []]);

  const shuffleWords = () => {
    if (words && words.length > 0) {
      const wordsCopy = [...words];
      let wordsArr: string[] = [];
      let translationsArr: string[] = [];
      wordsCopy.forEach((el) => {
        wordsArr.push(el[0]);
        translationsArr.push(el[1]);
      });

      shuffleArray(wordsArr);
      shuffleArray(translationsArr);

      setShuffledWords(wordsArr);
      setShuffledTranslations(translationsArr);
    }
  };

  const highlightElement = (column: number, i: number) => {
    if (highlighted && !disabled[column].includes(i)) {
      const arr = [...highlighted];
      if (arr[column] === i) arr[column] = -1;
      else arr[column] = i;

      setHighlighted(arr);
    }
  };

  useEffect(() => {
    shuffleWords();
  }, []);

  useEffect(() => {
    if (highlighted.length >= 2) {
      const word = shuffledWords[highlighted[0]];
      const translation = shuffledTranslations[highlighted[1]];
      words.forEach((el) => {
        if (el[0] === word && el[1] === translation) {
          const disabledArr = [...disabled];
          disabledArr[0].push(highlighted[0]);
          disabledArr[1].push(highlighted[1]);
          setDisabled(disabledArr);
          setHighlighted([]);
        }
      });
      checkWords([word, translation], disabled[0].length);
    }
  }, [highlighted]);

  return (
    <Box
      sx={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{ padding: "1.5em 0 0.7em 0", textAlign: "center" }}
      >
        {task}:
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box>
          {words &&
            shuffledWords.map((el, i) => {
              const isHighlighted = highlighted[0] === i;
              const isDisabled = disabled[0].indexOf(i) !== -1;

              return (
                <Box
                  key={i}
                  onClick={() => highlightElement(0, i)}
                  sx={{
                    minWidth: "160px",
                    minHeight: "60px",
                    margin: "1em",
                    padding: "0.7em",
                    alignContent: "center",
                    borderRadius: "5px",
                    fontWeight: isHighlighted ? "600" : "initial",
                    textAlign: "center",
                    boxShadow: "0px 1px 3px gray",
                    color: isHighlighted
                      ? "primary.contrastText"
                      : "primary.light",
                    backgroundColor: isDisabled
                      ? "lightgray"
                      : isHighlighted
                      ? "primary.light"
                      : "primary.contrastText",
                    cursor: isDisabled ? "initial" : "pointer",

                    "&:hover": {
                      boxShadow: isDisabled ? "none" : "0px 2px 5px gray",
                    },
                  }}
                >
                  {el}
                </Box>
              );
            })}
        </Box>
        <Box>
          {words &&
            shuffledTranslations.map((el, i) => {
              const isHighlighted = highlighted[1] === i;
              const isDisabled = disabled[1].indexOf(i) !== -1;

              return (
                <Box
                  key={i}
                  onClick={() => highlightElement(1, i)}
                  sx={{
                    minWidth: "160px",
                    minHeight: "60px",
                    margin: "1em",
                    padding: "0.7em",
                    alignContent: "center",
                    borderRadius: "5px",
                    fontWeight: isHighlighted ? "600" : "initial",
                    textAlign: "center",
                    boxShadow: "0px 1px 3px gray",
                    color: isHighlighted
                      ? "primary.contrastText"
                      : "primary.light",
                    backgroundColor: isDisabled
                      ? "lightgray"
                      : isHighlighted
                      ? "primary.light"
                      : "primary.contrastText",
                    cursor: isDisabled ? "initial" : "pointer",

                    "&:hover": {
                      boxShadow: isDisabled ? "none" : "0px 2px 5px gray",
                    },
                  }}
                >
                  {el}
                </Box>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}
