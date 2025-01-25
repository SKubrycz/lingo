import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LessonData {
  correct: boolean[];
}

const initialState: LessonData = {
  correct: [],
};

export const lessonSlice = createSlice({
  name: "lesson",
  initialState: initialState,
  reducers: {
    setCorrectData: (state, action: PayloadAction<LessonData>) => {
      return {
        ...state,
        correct: action.payload.correct,
      };
    },
  },
});

export const { setCorrectData } = lessonSlice.actions;

export default lessonSlice.reducer;
