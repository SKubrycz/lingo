import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimeSpent {
  timeStart: DOMHighResTimeStamp;
}

const timeSpent: TimeSpent = {
  timeStart: 0,
};

export const timeSpentSlice = createSlice({
  name: "timespent",
  initialState: timeSpent,
  reducers: {
    setTimeSpent: (state, action: PayloadAction<TimeSpent>) => {
      return { ...action.payload };
    },
  },
});

export const { setTimeSpent } = timeSpentSlice.actions;

export default timeSpentSlice.reducer;
