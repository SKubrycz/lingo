const handleLanguageURL = (route: string, lang: string | null): string => {
  const url = lang
    ? `http://localhost:${
        import.meta.env.VITE_SERVER_PORT
      }${route}?language=${lang}`
    : `http://localhost:${import.meta.env.VITE_SERVER_PORT}${route}`;

  return url;
};

export default handleLanguageURL;
