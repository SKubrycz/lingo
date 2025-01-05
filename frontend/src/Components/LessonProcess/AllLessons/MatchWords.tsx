interface MatchWordsProps {
  lessonId: number;
  exerciseId: number;
  lessonInfo: any;
  isLastExercise: boolean;
}

export default function MatchWords({
  lessonId,
  exerciseId,
  lessonInfo,
  isLastExercise = false,
}: MatchWordsProps) {
  return <>MatchWords</>;
}
