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
