import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Language {
  lang: string;
  languages: string[];
}

interface LanguageLang {
  lang: string;
}

export const languageSlice = createSlice({
  name: "language",
  initialState: {
    lang: localStorage.getItem("language-lingo") ?? "pl",
    languages: ["pl", "de"],
  },
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
