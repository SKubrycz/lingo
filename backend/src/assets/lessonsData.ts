import { ObjectId } from "mongodb";

// IDEA: type: string; for letting frontend know what exercise template to apply (?)

const l1exercises = [
  {
    exerciseId: 1,
    type: "card",
    word: "Good morning",
    translation: "Dzień dobry",
    description: "o poranku",
  },
  {
    exerciseId: 2,
    type: "card",
    word: "Good afternoon",
    translation: "Dzień dobry",
    description: "po południu",
  },
  {
    exerciseId: 3,
    type: "card",
    word: "Good evening",
    translation: "Dobry wieczór",
    description: "",
  },
  {
    exerciseId: 4,
    type: "card",
    word: "Good night",
    translation: "Dobranoc",
    description: "",
  },
  {
    exerciseId: 5,
    type: "card",
    word: "Hi",
    translation: "Cześć",
    description: "nieformalne przywitanie",
  },
  {
    exerciseId: 6,
    type: "card",
    word: "Hello",
    translation: "Cześć",
    description: "bardziej formalne przywitanie",
  },
];

export const lesson1 = {
  _id: new ObjectId("66af513c23082b6501dade65"),
  lessonId: 1,
  title: "Wprowadzenie",
  description: "Nauczysz się jak przywitać się w języku angielskim",
  exercises: l1exercises,
  new_words: [
    "Hi",
    "Hello",
    "Good morning",
    "Good afternoon",
    "Good evening",
    "Goodbye",
    "Bye",
  ],
  exerciseCount: l1exercises.length,
};

const l2exercises = [];

export const lesson2 = {
  _id: new ObjectId("66c0cc3ffba0ae1abe9684b0"),
  lessonId: 2,
  title: "Zwroty w różnych osobach",
  description: "Lorem ipsum opis drugiej lekcji",
  new_words: ["Me", "You", "He", "She", "They", "Mr", "Mrs"],
};
