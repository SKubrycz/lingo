export interface CardExercise {
  exerciseId: number;
  type: string;
  word: string;
  translation: string;
  description: string;
}

export interface CardExerciseData {
  exercise: CardExercise;
  exerciseCount: number;
}

export interface InputExercise {
  exerciseId: number;
  question: string;
  task: string;
  missingWords: string;
}

export interface InputExerciseData {
  exercise: InputExercise;
  exerciseCount: number;
}
