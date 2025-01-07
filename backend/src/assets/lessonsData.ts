export interface CardExercise {
  exerciseId: number;
  type: "card";
  word: string;
  translation: string;
  description: string;
}

export interface InputExercise {
  exerciseId: number;
  type: "input";
  question: string;
  task: string;
  missingWords: string;
}

export interface ChoiceExercise {
  exerciseId: number;
  type: "choice";
  task: string;
  word: string;
  words: string[];
  answer: string;
}

export interface MatchExercise {
  exerciseId: number;
  type: "match";
  task: string;
  words: string[][]; // words = [["You", "Ty"], ...]
}

export interface LessonPanel {
  lessonId: number;
  language: string;
  title: string;
  description: string;
  exercises: (CardExercise | InputExercise | ChoiceExercise | MatchExercise)[];
  newWords: string[];
  exerciseCount: number;
}

const l1exercises: (
  | CardExercise
  | InputExercise
  | ChoiceExercise
  | MatchExercise
)[] = [
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
    exerciseId: 7,
    type: "input",
    question: "Jak przywitamy się z kimś przed południem?",
    task: "Wypełnij puste pole",
    missingWords: "good morning",
  },
  {
    exerciseId: 8,
    type: "input",
    question: "Jak przywitamy się ze znajomym? (przywitanie nieformalne)",
    task: "Wypełnij puste pole",
    missingWords: "hi",
  },
  {
    exerciseId: 9,
    type: "choice",
    task: "Wybierz odpowiednie tłumaczenie słowa",
    word: "Good night",
    words: ["Dobranoc", "Cześć", "Dobry wieczór"],
    answer: "Dobranoc",
  },
  {
    exerciseId: 10,
    type: "choice",
    task: "Wybierz odpowiednie tłumaczenie słowa",
    word: "Good evening",
    words: ["Dobry wieczór", "Dzień dobry", "Dobranoc"],
    answer: "Dobry wieczór",
  },
];

export const lesson1: LessonPanel = {
  lessonId: 1,
  language: "pl",
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

const l2exercises: (
  | CardExercise
  | InputExercise
  | ChoiceExercise
  | MatchExercise
)[] = [
  {
    exerciseId: 1,
    type: "card",
    word: "I am",
    translation: "Ja jestem",
    description: "",
  },
  {
    exerciseId: 2,
    type: "card",
    word: "You are",
    translation: "Ty jesteś/Wy jesteście",
    description: "Używane zarówno w liczbie pojedynczej oraz mnogiej",
  },
  {
    exerciseId: 3,
    type: "card",
    word: "He is",
    translation: "On jest",
    description: "",
  },
  {
    exerciseId: 4,
    type: "card",
    word: "She is",
    translation: "Ona jest",
    description: "",
  },
  {
    exerciseId: 5,
    type: "card",
    word: "It is",
    translation: "To/Ono jest",
    description: "",
  },
  {
    exerciseId: 6,
    type: "card",
    word: "We are",
    translation: "My jesteśmy",
    description: "",
  },
  {
    exerciseId: 7,
    type: "card",
    word: "They are",
    translation: "Oni/One są",
    description: "",
  },
  {
    exerciseId: 8,
    type: "match",
    task: "Dobierz w pary",
    words: [
      ["I am", "Ja jestem"],
      ["You are", "Ty jesteś/Wy jesteście"],
      ["He is", "On jest"],
      ["We are", "My jesteśmy"],
      ["They are", "Oni/One są"],
    ],
  },
];

export const lesson2: LessonPanel = {
  lessonId: 2,
  language: "pl",
  title: "Zwroty w różnych osobach",
  description: "Poznasz odmianę przez osoby",
  exercises: l2exercises,
  newWords: [],
  exerciseCount: l2exercises.length,
};
l2exercises.forEach((el, i) => {
  if ("word" in el && el.type === "card") {
    lesson2.newWords.push(el.word);
  }
});
