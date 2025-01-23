export const notFoundLangData = [
  {
    metadata: { route: "/not-found", language: "pl" },
    navbar: {
      tooltip: "Zmień język strony",
      home: "Strona główna",
    },
    main: {
      return: "Powrót na stronę główną",
      button: "Strona główna",
    },
    alerts: {
      notFound: "Błąd 404: Nie znaleziono zawartości",
      internalServerError: "Coś poszło nie tak po naszej stronie",
    },
  },
  {
    metadata: { route: "/not-found", language: "de" },
    navbar: {
      tooltip: "Ändern Sie die Sprache der Website",
      home: "Startseite",
    },
    main: {
      return: "Zurück zur Startseite",
      button: "Startseite",
    },
    alerts: {
      notFound: "Fehler 404: Inhalt nicht gefunden",
      internalServerError: "Auf unserer Seite ist etwas schief gelaufen",
    },
  },
];
