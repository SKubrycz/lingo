export const setLangIndex = (lang: string | undefined): number | null => {
  let index = null;

  console.log(lang);

  switch (lang) {
    case "pl":
      index = 1;
      break;
    case "de":
      index = 2;
      break;
    default:
      index = null;
      break;
  }

  return index;
};
