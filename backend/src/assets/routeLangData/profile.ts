export const profileLangData = [
  {
    metadata: { route: "/profile", language: "pl" },
    navbar: {
      tooltip: "Zmień język strony",
      about: "O aplikacji",
      lessons: "Lekcje",
      logout: "Wyloguj",
    },
    title: "Profil",
    user: {
      you: "(Ty)",
      date: "Data założenia konta",
    },
    settings: {
      tooltip: "Otwórz ustawienia użytkownika",
      dialog: {
        title: "Ustawienia",
        button: "Usuń konto",
        confirm: {
          title: "Czy na pewno chcesz usunąć konto?",
          yes: "Tak",
          no: "Nie",
        },
      },
    },
    stats: {
      timeSpent: {
        title: "Czas spędzony na nauce",
        units: ["s", "min.", "godz."],
      },
      finishedLessons: "Liczba ukończonych lekcji",
      accuracy: {
        title: "Dokładność w lekcjach",
        tooltip: "Procent poprawnych odpowiedzi (ze wszystkich lekcji)",
      },
      wordsLearned: "Nauczone słowa",
    },
    newlyLearnedWords: {
      title: "Nowo poznane słowa",
      fallback: "Ukończ swoją pierwszą lekcję aby wyświetlić nauczone słowa",
    },
    chart: {
      x: "Data",
      y: "Ilość ukończonych lekcji",
    },
    footer: {
      about: "O aplikacji",
      lessons: "Lekcje",
    },
    alerts: {
      notFound: "Nie znaleziono użytkownika",
      internalServerError: "Coś poszło nie tak po naszej stronie",
    },
  },
  {
    metadata: { route: "/profile", language: "de" },
    navbar: {
      tooltip: "Ändern Sie die Sprache der Seite",
      about: "Über die App",
      lessons: "Unterricht",
      logout: "Ausloggen",
    },
    title: "Profil",
    user: {
      you: "(Du)",
      date: "Datum der Erstellung des Benutzerkontos",
    },
    settings: {
      tooltip: "Benutzereinstellungen öffnen",
      dialog: {
        title: "Einstellungen",
        button: "Benutzerkonto löschen",
        confirm: {
          title: "Sind Sie sicher, dass Sie Ihr Konto löschen möchten?",
          yes: "Ja",
          no: "Nein",
        },
      },
    },
    stats: {
      timeSpent: {
        title: "Zeit zum Lernen",
        units: ["Sek.", "Min.", "Std."],
      },
      finishedLessons: "Anzahl der absolvierten Lektionen",
      accuracy: {
        title: "Akkuratesse im Unterricht",
        tooltip: "Prozentsatz der richtigen Antworten (aus allen Lektionen)",
      },
      wordsLearned: "Gelernte Worte",
    },
    newlyLearnedWords: {
      title: "Neu gelernte Wörter",
      fallback:
        "Füllen Sie die erste Lektion aus, um zu zeigen, welche Wörter Sie gelernt haben",
    },
    chart: {
      x: "Datum",
      y: "Anzahl der absolvierten Lektionen",
    },
    footer: {
      about: "Über die App",
      lessons: "Unterricht",
    },
    alerts: {
      notFound: "Benutzer nicht gefunden",
      internalServerError: "Auf unserer Seite ist etwas schief gelaufen",
    },
  },
];
