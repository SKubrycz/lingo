import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Language {
  lang: string;
  languages: string[];
}

interface LanguageLang {
  lang: string;
}

const initialState: Language = {
  lang: localStorage.getItem("language-lingo") ?? "pl",
  languages: ["pl", "de"],
};

export const languageSlice = createSlice({
  name: "language",
  initialState: initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageLang>) => {
      return {
        ...state,
        lang: action.payload.lang,
      };
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
