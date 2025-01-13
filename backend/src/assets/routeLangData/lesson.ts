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
    alerts: {},
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
    alerts: {},
  },
];
