import { useState, useRef, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import { LessonData } from "./LessonProcessStepper";
import { PermDeviceInformation } from "@mui/icons-material";

export default function LessonProcessStepperContent({ id }: LessonData) {
  //later to be replaced by API call
  /*   const wordBlocks: string[] = [
    "I am",
    "You are",
    "He is",
    "Hello",
    "Good morning",
    "Good afternoon",
  ]; */

  const [sentenceArr, setSentenceArr] = useState<string[]>([]);
  const [wordBlocks, setWordBlocks] = useState<string[]>([
    "I am",
    "You are",
    "He is",
    "Hello",
    "Good morning",
    "Good afternoon",
  ]);

  const dropInput = useRef<HTMLElement | null>(null);

  const dragWord = (e: React.DragEvent<HTMLElement>, item: string) => {
    console.log(`dragWord`);
    if (e.dataTransfer && dropInput.current) {
      e.dataTransfer.setData("word", JSON.stringify(item));
    }
  };

  const dropWord = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(`dropWord`);
    if (e.dataTransfer) {
      const data = JSON.parse(e.dataTransfer.getData("word"));
      console.log(data);
      setSentenceArr([...sentenceArr, data]);
      setWordBlocks(wordBlocks.filter((w) => w != data));
    }
  };

  const handleAddWord = (word: string) => {
    setWordBlocks(wordBlocks.filter((item, i) => item != word));
    setSentenceArr([...sentenceArr, word]); //LATER: change the whole array system to a map and keep the wordBlock order e.g. map[1]"I am"
  };

  const handleRemoveWord = (word: string) => {
    setSentenceArr(sentenceArr.filter((item, i) => item != word));
    setWordBlocks([...wordBlocks, word]); //LATER: change the whole array system to a map and keep the wordBlock order e.g. map[1]"I am"
    console.log(`onclick filtered`);
  };

  useEffect(() => {
    if (sentenceArr.length < 1) return;
    const word: string = sentenceArr[sentenceArr.length - 1];
    console.log(word);
  }, [sentenceArr]);

  return (
    <Box
      width="100%"
      margin="1em"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h6">LESSON CONTENT (id: {id ? id : ""})</Typography>
      <Box
        ref={dropInput}
        component="article"
        onDrop={(e) => dropWord(e)}
        onDragOver={(e) => e.preventDefault()}
        display="flex"
        justifyContent="flex-start"
        sx={{
          width: "80%",
          margin: "1em",
          padding: ".7em",
          fontSize: "18px",
          borderBottom: "2px solid",
          borderColor: "primary.contrastText",
        }}
      >
        {sentenceArr.map((s, i) => {
          return (
            <div
              key={i}
              style={{
                margin: "0 .5em",
                padding: ".3em",
                border: "2px solid gray",
                borderRadius: ".5em",
              }}
              onClick={() => handleRemoveWord(s)}
            >
              {s}
            </div>
          );
        })}
      </Box>
      <Box component="aside">
        {wordBlocks.map((word, i) => {
          return (
            <div
              key={i}
              draggable={true}
              onDragStart={(e) => dragWord(e, word)}
              onClick={() => handleAddWord(word)}
            >
              {word}
            </div>
          );
        })}
      </Box>
    </Box>
  );
}
