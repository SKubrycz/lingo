interface UI {
  language: string;
  next: string;
  finish: string;
}

export interface CardExerciseUI extends UI {
  type: "card";
  title: string;
}

export interface InputExerciseUI extends UI {
  type: "input";
  task: string;
  placeholder: string;
  submit: string;
  correct: string;
  incorrect: string;
}

export interface ChoiceExerciseUI extends UI {
  type: "choice";
  task: string;
  correct: string;
  incorrect: string;
}

export interface MatchExerciseUI extends UI {
  type: "match";
  task: string;
}

export const cardExercisePl: CardExerciseUI = {
  type: "card",
  language: "pl",
  title: "Nowe słowo",
  next: "Dalej",
  finish: "Zakończ",
};
export const cardExerciseDe: CardExerciseUI = {
  type: "card",
  language: "de",
  title: "Neues Wort",
  next: "Nächste",
  finish: "Beenden",
};

export const inputExercisePl: InputExerciseUI = {
  type: "input",
  language: "pl",
  task: "Wypełnij puste pole",
  placeholder: "Wypełnij pole",
  submit: "Sprawdź",
  correct: "Dobrze!",
  incorrect: "Źle, prawidłowa odpowiedź to:",
  next: "Dalej",
  finish: "Zakończ",
};
export const inputExerciseDe: InputExerciseUI = {
  type: "input",
  language: "de",
  task: "Füllen Sie das Feld aus",
  placeholder: "Füllen Sie das Feld",
  submit: "Überprüfen Sie",
  correct: "Richtig!",
  incorrect: "Falsch, die richtige Antwort ist:",
  next: "Nächste",
  finish: "Beenden",
};

export const choiceExercisePl: ChoiceExerciseUI = {
  type: "choice",
  language: "pl",
  task: "Wybierz odpowiednie tłumaczenie słowa",
  correct: "Dobrze!",
  incorrect: "Źle, prawidłowa odpowiedź to:",
  next: "Dalej",
  finish: "Zakończ",
};
export const choiceExerciseDe: ChoiceExerciseUI = {
  type: "choice",
  language: "de",
  task: "Wählen Sie die passende Übersetzung des Wortes",
  correct: "Richtig!",
  incorrect: "Falsch, die richtige Antwort ist:",
  next: "Nächste",
  finish: "Beenden",
};

export const matchExercisePl: MatchExerciseUI = {
  type: "match",
  language: "pl",
  task: "Dobierz w pary",
  next: "Dalej",
  finish: "Zakończ",
};
export const matchExerciseDe: MatchExerciseUI = {
  type: "match",
  language: "de",
  task: "Paare finden",
  next: "Nächste",
  finish: "Beenden",
};
