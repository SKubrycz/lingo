interface CardExercise {
  exerciseId: number;
  type: "card";
  word: string;
  translation: string;
  description: string;
}

interface InputExercise {
  exerciseId: number;
  type: "input";
  question: string;
  task: string;
  missingWords: string;
}

interface ChoiceExercise {
  exerciseId: number;
  type: "choice";
  question: string;
  task: string;
  words: string[];
  answer: string;
}

interface MatchExercise {
  exerciseId: number;
  type: "match";
  task: string;
  words: string[][]; // words = [["You", "Ty"], ...]
}

interface LessonPanel {
  lessonId: number;
  title: string;
  description: string;
  exercises: (CardExercise | InputExercise)[];
  newWords: string[];
  exerciseCount: number;
}

const l1exercises: (CardExercise | InputExercise)[] = [
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
  {
    // ! No sentences to fill, just TextField
    exerciseId: 7,
    type: "input",
    question: "Jak przywitamy się z kimś przed południem?",
    task: "Wypełnij puste pole",
    missingWords: "good morning",
  },
  {
    // ! No sentences to fill, just TextField
    exerciseId: 8,
    type: "input",
    question: "Jak przywitamy się ze znajomym? (przywitanie nieformalne)",
    task: "Wypełnij puste pole",
    missingWords: "hi",
  },
];

export const lesson1: LessonPanel = {
  lessonId: 1,
  title: "Wprowadzenie",
  description: "Nauczysz się jak przywitać się w języku angielskim",
  exercises: l1exercises,
  newWords: [],
  exerciseCount: l1exercises.length,
};
l1exercises.forEach((el, i) => {
  if ("word" in el && el.type === "card") {
    lesson1.newWords.push(el.word);
  }
});

const l2exercises: (CardExercise | InputExercise)[] = [];

export const lesson2: LessonPanel = {
  lessonId: 2,
  title: "Zwroty w różnych osobach",
  description: "Lorem ipsum opis drugiej lekcji",
  exercises: l2exercises,
  newWords: ["Me", "You", "He", "She", "They", "Mr", "Mrs"],
  exerciseCount: l2exercises.length,
};
l2exercises.forEach((el, i) => {
  if ("word" in el && el.type === "card") {
    lesson2.newWords.push(el.word);
  }
});
