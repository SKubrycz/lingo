export const deleteAccountLangData = [
  {
    metadata: {
      route: "/delete-account",
      language: "pl",
    },
    subtitle: "Aby usunąć konto wprowadź kod otrzymany w wiadomości email",
    submit: "Zatwierdź",
    alerts: {
      ok: [
        "Strona została wczytana poprawnie",
        "Rozpoczęto procedurę usunięcia konta",
        "Nastąpiło prawidłowe usunięcie konta",
      ],
      badRequest: [
        "Nieprawidłowy identyfikator usunięcia konta",
        "Podano nieprawidłowy kod",
      ],
      forbidden: "Nieprawidłowa podstrona",
      internalServerError: "Coś poszło nie tak po naszej stronie",
    },
  },
  {
    metadata: {
      route: "/delete-account",
      language: "de",
    },
    subtitle:
      "Um Ihr Konto zu löschen, geben Sie den Code ein, den Sie in Ihrer E-Mail erhalten haben.",
    submit: "Bestätigen",
    alerts: {
      ok: [
        "Die Seite wurde korrekt geladen",
        "Das Verfahren zur Kontolöschung wurde eingeleitet",
        "Das Konto wurde erfolgreich gelöscht",
      ],
      badRequest: [
        "Ungültige ID zur Kontolöschung",
        "Falscher Code eingegeben",
      ],
      forbidden: "Ungültige Unterseite",
      internalServerError: "Auf unserer Seite ist etwas schief gelaufen",
    },
  },
];
