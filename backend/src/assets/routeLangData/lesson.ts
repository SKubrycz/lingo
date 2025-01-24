export const lessonLangData = [
  {
    metadata: { route: "/lesson", language: "pl" },
    tooltips: {
      close: "Zakończ lekcję",
      progress: "Postęp lekcji",
    },
    dialog: {
      title: "Czy na pewno chcesz opuścić lekcję?",
      subtitle: "Postęp nie zostanie zapisany",
      buttons: {
        finish: "Zakończ",
        cancel: "anuluj",
      },
    },
    alerts: {
      ok: ["Lekcja zakończona pomyślnie", "Odpowiedź zweryfikowana"],
      badRequest: [
        "Należy ukończyć wcześniejsze lekcje",
        "Przesłano nieprawidłową zawartość",
      ],
      notFound: [
        "Nie znaleziono lekcji",
        "Nie znaleziono ćwiczenia w zażądanej lekcji",
        "Serwer nie otrzymał wymaganej zawartości",
      ],
      internalServerError: [
        "Coś poszło nie tak po naszej stronie",
        "Nie udało się pobrać danych",
        "Nie udało się zapisać postępu lekcji",
      ],
    },
  },
  {
    metadata: { route: "/lesson", language: "de" },
    tooltips: {
      close: "Beende die Lektion",
      progress: "Unterrichtsfortschritt",
    },
    dialog: {
      title: "Sind Sie sicher, dass Sie die Stunde verlassen wollen?",
      subtitle: "Der Fortschritt wird nicht gespeichert",
      buttons: {
        finish: "Beende",
        cancel: "Stornieren",
      },
    },
    alerts: {
      ok: ["Lektion erfolgreich abgeschlossen", "Antwort geprüft"],
      badRequest: [
        "Frühere Lektionen müssen abgeschlossen sein",
        "Ungültiger Inhalt hochgeladen",
      ],
      notFound: [
        "Lektionen nicht gefunden",
        "Übung nicht in der gewünschten Lektion gefunde",
        "Der Server hat den gewünschten Inhalt nicht erhalten",
      ],
      internalServerError: [
        "Auf unserer Seite ist etwas schief gelaufen",
        "Download fehlgeschlagen",
        "Lektionsfortschritt konnte nicht gespeichert werden",
      ],
    },
  },
];
