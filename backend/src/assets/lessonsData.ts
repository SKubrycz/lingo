export interface CardExercise {
  exerciseId: number;
  type: "card";
  title: string;
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

const l1ExercisesPl: (
  | CardExercise
  | InputExercise
  | ChoiceExercise
  | MatchExercise
)[] = [
  {
    exerciseId: 1,
    type: "card",
    title: "Nowe słowo",
    word: "Good morning",
    translation: "Dzień dobry",
    description: "o poranku",
  },
  {
    exerciseId: 2,
    type: "card",
    title: "Nowe słowo",
    word: "Good afternoon",
    translation: "Dzień dobry",
    description: "po południu",
  },
  {
    exerciseId: 3,
    type: "card",
    title: "Nowe słowo",
    word: "Good evening",
    translation: "Dobry wieczór",
    description: "",
  },
  {
    exerciseId: 4,
    type: "card",
    title: "Nowe słowo",
    word: "Good night",
    translation: "Dobranoc",
    description: "",
  },
  {
    exerciseId: 5,
    type: "card",
    title: "Nowe słowo",
    word: "Hi",
    translation: "Cześć",
    description: "nieformalne przywitanie",
  },
  {
    exerciseId: 6,
    type: "card",
    title: "Nowe słowo",
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

export const lesson1Pl: LessonPanel = {
  lessonId: 1,
  language: "pl",
  title: "Wprowadzenie",
  description: "Nauczysz się jak przywitać się w języku angielskim",
  exercises: l1ExercisesPl,
  newWords: [],
  exerciseCount: l1ExercisesPl.length,
};
l1ExercisesPl.forEach((el, i) => {
  if ("word" in el && el.type === "card") {
    lesson1Pl.newWords.push(el.word);
  }
});

const l1ExercisesDe: (
  | CardExercise
  | InputExercise
  | ChoiceExercise
  | MatchExercise
)[] = [
  {
    exerciseId: 1,
    type: "card",
    title: "Neues Wort",
    word: "Good morning",
    translation: "Guten Morgen",
    description: "am Vormittag",
  },
  {
    exerciseId: 2,
    type: "card",
    title: "Neues Wort",
    word: "Good afternoon",
    translation: "Guten Tag",
    description: "Nachmittag",
  },
  {
    exerciseId: 3,
    type: "card",
    title: "Neues Wort",
    word: "Good evening",
    translation: "Guten Abend",
    description: "",
  },
  {
    exerciseId: 4,
    type: "card",
    title: "Neues Wort",
    word: "Good night",
    translation: "Gute Nacht",
    description: "",
  },
  {
    exerciseId: 5,
    type: "card",
    title: "Neues Wort",
    word: "Hi",
    translation: "Hi",
    description: "informelle Begrüßung",
  },
  {
    exerciseId: 6,
    type: "card",
    title: "Neues Wort",
    word: "Hello",
    translation: "Hallo",
    description: "eine formellere Begrüßung",
  },
  {
    exerciseId: 7,
    type: "input",
    question: "Wie begrüßt man jemanden vor dem Mittag?",
    task: "Füllen Sie das Feld aus",
    missingWords: "good morning",
  },
  {
    exerciseId: 8,
    type: "input",
    question: "Wie grüßt man einen Freund? (informeller Gruß)",
    task: "Füllen Sie das Feld aus",
    missingWords: "hi",
  },
  {
    exerciseId: 9,
    type: "choice",
    task: "Wählen Sie die passende Übersetzung des Wortes",
    word: "Good night",
    words: ["Gute Nacht", "Hallo", "Guten Abend"],
    answer: "Gute Nacht",
  },
  {
    exerciseId: 10,
    type: "choice",
    task: "Wybierz odpowiednie tłumaczenie słowa",
    word: "Good evening",
    words: ["Guten Abend", "Guten Tag", "Gute Nacht"],
    answer: "Guten Abend",
  },
];

export const lesson1De: LessonPanel = {
  lessonId: 1,
  language: "de",
  title: "Einführung",
  description: "Begrüßungen auf Englisch lernen",
  exercises: l1ExercisesDe,
  newWords: [],
  exerciseCount: l1ExercisesDe.length,
};
l1ExercisesDe.forEach((el, i) => {
  if ("word" in el && el.type === "card") {
    lesson1De.newWords.push(el.word);
  }
});

const l2ExercisesPl: (
  | CardExercise
  | InputExercise
  | ChoiceExercise
  | MatchExercise
)[] = [
  {
    exerciseId: 1,
    type: "card",
    title: "Nowe słowo",
    word: "I am",
    translation: "Ja jestem",
    description: "",
  },
  {
    exerciseId: 2,
    type: "card",
    title: "Nowe słowo",
    word: "You are",
    translation: "Ty jesteś/Wy jesteście",
    description: "Używane zarówno w liczbie pojedynczej oraz mnogiej",
  },
  {
    exerciseId: 3,
    type: "card",
    title: "Nowe słowo",
    word: "He is",
    translation: "On jest",
    description: "",
  },
  {
    exerciseId: 4,
    type: "card",
    title: "Nowe słowo",
    word: "She is",
    translation: "Ona jest",
    description: "",
  },
  {
    exerciseId: 5,
    type: "card",
    title: "Nowe słowo",
    word: "It is",
    translation: "To/Ono jest",
    description: "",
  },
  {
    exerciseId: 6,
    type: "card",
    title: "Nowe słowo",
    word: "We are",
    translation: "My jesteśmy",
    description: "",
  },
  {
    exerciseId: 7,
    type: "card",
    title: "Nowe słowo",
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

export const lesson2Pl: LessonPanel = {
  lessonId: 2,
  language: "pl",
  title: "Zwroty w różnych osobach",
  description: "Poznasz odmianę przez osoby",
  exercises: l2ExercisesPl,
  newWords: [],
  exerciseCount: l2ExercisesPl.length,
};
l2ExercisesPl.forEach((el, i) => {
  if ("word" in el && el.type === "card") {
    lesson2Pl.newWords.push(el.word);
  }
});

const l2ExercisesDe: (
  | CardExercise
  | InputExercise
  | ChoiceExercise
  | MatchExercise
)[] = [
  {
    exerciseId: 1,
    type: "card",
    title: "Neues Wort",
    word: "I am",
    translation: "Ich bin",
    description: "",
  },
  {
    exerciseId: 2,
    type: "card",
    title: "Neues Wort",
    word: "You are",
    translation: "Du bist/Ihr seid",
    description: "Sowohl im Singular als auch im Plural verwendet",
  },
  {
    exerciseId: 3,
    type: "card",
    title: "Neues Wort",
    word: "He is",
    translation: "Er ist",
    description: "",
  },
  {
    exerciseId: 4,
    type: "card",
    title: "Neues Wort",
    word: "She is",
    translation: "Sie ist",
    description: "",
  },
  {
    exerciseId: 5,
    type: "card",
    title: "Neues Wort",
    word: "It is",
    translation: "Es ist",
    description: "",
  },
  {
    exerciseId: 6,
    type: "card",
    title: "Neues Wort",
    word: "We are",
    translation: "Wir sind",
    description: "",
  },
  {
    exerciseId: 7,
    type: "card",
    title: "Neues Wort",
    word: "They are",
    translation: "Sie sind",
    description: "",
  },
  {
    exerciseId: 8,
    type: "match",
    task: "Paare finden",
    words: [
      ["I am", "Ich bin"],
      ["You are", "Du bist/Ihr seid"],
      ["He is", "Er ist"],
      ["We are", "Wir sind"],
      ["They are", "Sie sind"],
    ],
  },
];

export const lesson2De: LessonPanel = {
  lessonId: 2,
  language: "de",
  title: "Phrasen in verschiedenen Personas",
  description: "Sie lernen, mit Personen zu konjugieren",
  exercises: l2ExercisesDe,
  newWords: [],
  exerciseCount: l2ExercisesDe.length,
};
l2ExercisesDe.forEach((el, i) => {
  if ("word" in el && el.type === "card") {
    lesson2De.newWords.push(el.word);
  }
});
