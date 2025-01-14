export const verifyLangData = [
  {
    metadata: { route: "/verify", language: "pl" },
    title: "Zweryfikuj swoje konto",
    subtitle:
      "Podaj kod weryfikacyjny, który wysłaliśmy Ci na Twój email podany podczas rejestracji",
    submit: "Zatwierdź",
    alerts: {
      ok: ["Znaleziono użytkownika", "Weryfikacja przebiegła pomyślnie"],
      badRequest: "Niepoprawny kod weryfikacyjny",
      permanentRedirect: "Konto zostało już zweryfikowane",
      notFound: ["Nie ma takiego uuid", "Nie udało się zweryfikować emaila"],
      gone: "Okno czasowe weryfikacji emaila wygasło, proszę zarejestrować się ponownie",
      internalServerError: "Coś poszło nie tak po naszej stronie",
    },
  },
  {
    metadata: { route: "/verify", language: "de" },
    title: "Verifizieren Sie Ihr Konto",
    subtitle:
      "Geben Sie den Bestätigungscode ein, den wir an die bei der Registrierung angegebene E-Mail-Adresse gesendet haben",
    submit: "Bestätigen",
    alerts: {
      ok: ["Benutzer gefunden", "Die Verifizierung war erfolgreich"],
      badRequest: "Falscher Bestätigungscode",
      permanentRedirect: "Das Konto wurde bereits verifiziert",
      notFound: [
        "Es gibt keine solche UUID",
        "E-Mail-Verifizierung fehlgeschlagen",
      ],
      gone: "Das Zeitfenster für die E-Mail-Verifizierung ist abgelaufen. Bitte registrieren Sie sich erneut.",
      internalServerError: "Auf unserer Seite ist etwas schief gelaufen",
    },
  },
];
