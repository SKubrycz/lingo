const handleLanguageURL = (route: string, lang: string | null): string => {
  const url =
    lang && lang != "pl"
      ? `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }${route}?lang=${lang}`
      : `http://localhost:${import.meta.env.VITE_SERVER_PORT}${route}`;

  return url;
};

export default handleLanguageURL;
