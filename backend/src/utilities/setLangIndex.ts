export const setLangIndex = (lang: string | undefined): number | null => {
  let index = null;

  console.log(lang);

  switch (lang) {
    case "pl":
      index = 0;
      break;
    case "de":
      index = 1;
      console.log(index);
      break;
    default:
      index = null;
      break;
  }

  return index;
};
