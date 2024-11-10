import { ObjectId } from "mongodb";

const l1exercises = [
  {
    exerciseId: 1,
    type: "card",
    word: "Good morning",
    description: '"Dzień dobry" - o poranku',
  },
  {
    exerciseId: 2,
    type: "card",
    word: "Good afternoon",
    description: '"Dzień dobry" - po południu',
  },
  {
    exerciseId: 3,
    type: "card",
    word: "Good evening",
    description: '"Dobry wieczór"',
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
