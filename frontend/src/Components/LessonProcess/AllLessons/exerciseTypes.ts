export interface CardExercise {
  exerciseId: number;
  type: string;
  word: string;
  description: string;
}

export interface CardExerciseData {
  exercise: CardExercise;
  exerciseCount: number;
}

export interface CardExerciseProps {
  lessonId: number; // Lesson number;
}
