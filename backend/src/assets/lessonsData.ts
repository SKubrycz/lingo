import type {
  LessonPanel,
  CardExercise,
  InputExercise,
  ChoiceExercise,
  MatchExercise,
} from "./lessonsDataTypes";

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

const l3ExercisesPl: (
  | CardExercise
  | InputExercise
  | ChoiceExercise
  | MatchExercise
)[] = [
  {
    exerciseId: 1,
    type: "card",
    title: "Nowe słowo",
    word: "have",
    translation: "mieć",
    description: "forma bezosobowa",
  },
  {
    exerciseId: 2,
    type: "card",
    title: "Nowe słowo",
    word: "I have",
    translation: "Ja mam",
    description: "",
  },
  {
    exerciseId: 3,
    type: "card",
    title: "Nowe słowo",
    word: "You have",
    translation: "Ty masz/Wy macie",
    description: "",
  },
  {
    exerciseId: 4,
    type: "card",
    title: "Nowe słowo",
    word: "He has",
    translation: "On ma",
    description: "",
  },
  {
    exerciseId: 5,
    type: "card",
    title: "Nowe słowo",
    word: "She has",
    translation: "Ona ma",
    description: "",
  },
  {
    exerciseId: 6,
    type: "card",
    title: "Nowe słowo",
    word: "It has",
    translation: "To/Ono ma",
    description: "",
  },
  {
    exerciseId: 7,
    type: "card",
    title: "Nowe słowo",
    word: "We have",
    translation: "My mamy",
    description: "",
  },
  {
    exerciseId: 8,
    type: "card",
    title: "Nowe słowo",
    word: "They have",
    translation: "Oni/One mają",
    description: "",
  },
  {
    exerciseId: 9,
    type: "input",
    question: `Jak powiemy: "Oni mają"?`,
    task: "Wypełnij puste pole",
    missingWords: "they have",
  },
  {
    exerciseId: 10,
    type: "input",
    question: `Jak powiemy: "Ja mam"?`,
    task: "Wypełnij puste pole",
    missingWords: "i have",
  },
  {
    exerciseId: 11,
    type: "choice",
    task: "Wybierz odpowiednie tłumaczenie słowa",
    word: "I have",
    words: ["On ma", "Ty masz", "Ja mam"],
    answer: "Ja mam",
  },
  {
    exerciseId: 12,
    type: "choice",
    task: "Wybierz odpowiednie tłumaczenie słowa",
    word: "He has",
    words: ["On ma", "Ona ma", "Wy macie"],
    answer: "On ma",
  },
  {
    exerciseId: 13,
    type: "choice",
    task: "Wybierz odpowiednie tłumaczenie słowa",
    word: "You have",
    words: ["To/Ono ma", "Ona ma", "Ty masz/Wy macie"],
    answer: "Ty masz/Wy macie",
  },
  {
    exerciseId: 14,
    type: "match",
    task: "Dobierz w pary",
    words: [
      ["I have", "Ja mam"],
      ["You have", "Ty masz/Wy macie"],
      ["He has", "On ma"],
      ["She has", "Ona ma"],
      ["It has", "To/Ono ma"],
    ],
  },
];

export const lesson3Pl: LessonPanel = {
  lessonId: 3,
  language: "pl",
  title: "Odmiana czasownika",
  description: `Poznasz odmianę czasownika "mieć" przez osoby`,
  exercises: l3ExercisesPl,
  newWords: [],
  exerciseCount: l3ExercisesPl.length,
};
l3ExercisesPl.forEach((el, i) => {
  if ("word" in el && el.type === "card") {
    lesson3Pl.newWords.push(el.word);
  }
});

const l3ExercisesDe: (
  | CardExercise
  | InputExercise
  | ChoiceExercise
  | MatchExercise
)[] = [
  {
    exerciseId: 1,
    type: "card",
    title: "Neues Wort",
    word: "Have",
    translation: "Haben",
    description: "unpersönliche Form",
  },
  {
    exerciseId: 2,
    type: "card",
    title: "Neues Wort",
    word: "I have",
    translation: "Ich habe",
    description: "",
  },
  {
    exerciseId: 3,
    type: "card",
    title: "Neues Wort",
    word: "You have",
    translation: "Du hast/Ihr habt",
    description: "",
  },
  {
    exerciseId: 4,
    type: "card",
    title: "Neues Wort",
    word: "He has",
    translation: "Er hat",
    description: "",
  },
  {
    exerciseId: 5,
    type: "card",
    title: "Neues Wort",
    word: "She has",
    translation: "Sie hat",
    description: "",
  },
  {
    exerciseId: 6,
    type: "card",
    title: "Neues Wort",
    word: "It has",
    translation: "Es hat",
    description: "",
  },
  {
    exerciseId: 7,
    type: "card",
    title: "Neues Wort",
    word: "We have",
    translation: "Wir haben",
    description: "",
  },
  {
    exerciseId: 8,
    type: "card",
    title: "Neues Wort",
    word: "They have",
    translation: "Sie haben",
    description: "",
  },
  {
    exerciseId: 9,
    type: "input",
    question: `Wie sagt man: "Sie haben"?`,
    task: "Füllen Sie das Feld aus",
    missingWords: "they have",
  },
  {
    exerciseId: 10,
    type: "input",
    question: `Wie sagt man: "Ich habe"?`,
    task: "Füllen Sie das Feld aus",
    missingWords: "i have",
  },
  {
    exerciseId: 11,
    type: "choice",
    task: "Wählen Sie die passende Übersetzung des Wortes",
    word: "I have",
    words: ["Er hat", "Du hast", "Ich habe"],
    answer: "Ich habe",
  },
  {
    exerciseId: 12,
    type: "choice",
    task: "Wählen Sie die passende Übersetzung des Wortes",
    word: "He has",
    words: ["Er hat", "Sie hat", "Ihr habt"],
    answer: "Er hat",
  },
  {
    exerciseId: 13,
    type: "choice",
    task: "Wählen Sie die passende Übersetzung des Wortes",
    word: "You have",
    words: ["Es hat", "Sie hat", "Du hast/Ihr habt"],
    answer: "Du hast/Ihr habt",
  },
  {
    exerciseId: 14,
    type: "match",
    task: "Paare finden",
    words: [
      ["I have", "Ich habe"],
      ["You have", "Du hast/Ihr habt"],
      ["He has", "Er hat"],
      ["She has", "Sie hat"],
      ["It has", "Es hat"],
    ],
  },
];

export const lesson3De: LessonPanel = {
  lessonId: 3,
  language: "de",
  title: "Variante des Verbs",
  description: `Sie lernen die Konjugation des Verbs "haben" mit Personen`,
  exercises: l3ExercisesDe,
  newWords: [],
  exerciseCount: l3ExercisesDe.length,
};
l3ExercisesDe.forEach((el, i) => {
  if ("word" in el && el.type === "card") {
    lesson3De.newWords.push(el.word);
  }
});
