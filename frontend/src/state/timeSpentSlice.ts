import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TimeSpent {
  timeStart: DOMHighResTimeStamp;
  timeStop: DOMHighResTimeStamp;
}

const timeSpent: TimeSpent = {
  timeStart: 0,
  timeStop: 0,
};

export const timeSpentSlice = createSlice({
  name: "timespent",
  initialState: timeSpent,
  reducers: {
    setTimeStart: (state, action: PayloadAction<any>) => {
      console.log(`received:`);
      console.log(action.payload);

      return { ...state, timeStart: action.payload.timeStart };
    },
    setTimeStop: (state, action: PayloadAction<any>) => {
      console.log(`received:`);
      console.log(action.payload);

      return { ...state, timeStop: action.payload.timeStop };
    },
  },
});

export const { setTimeStart, setTimeStop } = timeSpentSlice.actions;

export default timeSpentSlice.reducer;
