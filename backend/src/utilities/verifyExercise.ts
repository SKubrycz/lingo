import {
  CardExercise,
  ChoiceExercise,
  InputExercise,
  MatchExercise,
} from "../assets/lessonsData";

type Exercises = CardExercise | InputExercise | ChoiceExercise | MatchExercise;

export const verifyExercise = (exercise: Exercises): boolean => {
  if (!exercise) return false;
  if (typeof exercise !== "object") return false;
  if (
    !Object.keys(exercise).includes("exerciseId") ||
    !Object.keys(exercise).includes("type")
  )
    return false;

  if (exercise.type === "card") {
    const { word, translation, description } = exercise;
    if (!word || typeof word !== "string" || word.length < 1) return false;
    if (
      !translation ||
      typeof translation !== "string" ||
      translation.length < 1
    )
      return false;
    if (typeof description !== "string") return false;
  } else if (exercise.type === "input") {
    const { question, task, missingWords } = exercise;
    if (!question || typeof question !== "string" || question.length < 1)
      return false;
    if (!task || typeof task !== "string" || task.length < 1) return false;
    if (
      !missingWords ||
      typeof missingWords !== "string" ||
      missingWords.length < 1
    )
      return false;
  } else if (exercise.type === "choice") {
    const { task, word, words, answer } = exercise;
    if (!task || typeof task !== "string" || task.length < 1) return false;
    if (!word || typeof word !== "string" || word.length < 1) return false;
    if (!words || !Array.isArray(words) || words.length < 1 || words.length > 3)
      return false;
    let isEmpty = false;
    for (let i = 0; i < words.length; i++) {
      if (words[i].length < 1) {
        isEmpty = true;
        break;
      }
    }
    if (isEmpty) return false;
    if (!answer || typeof answer !== "string" || answer.length < 1)
      return false;
  } else if (exercise.type === "match") {
    const { task, words } = exercise;
    if (!task || typeof task !== "string" || task.length < 1) return false;
    if (!words || !Array.isArray(words) || words.length < 1 || words.length > 3)
      return false;
    let isEmpty = false;
    for (let i = 0; i < words.length; i++) {
      if (words[i][0].length < 1 || words[i][1].length < 1) {
        isEmpty = true;
        break;
      }
    }
    if (isEmpty) return false;
  } else {
    return false;
  }

  console.log("Exercise verified successfully");

  return true;
};
