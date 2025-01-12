// indexes: 0 -> de; _fallback: pl;

import { Alerts, Metadata } from "./routeTypes";

interface HomeNavbar {
  tooltip: string;
  about: string;
  login: string;
  register: string;
}

interface HomeTitle {
  title: string;
  desc: string;
}

interface HomeButtonContainer {
  subtitle: string;
  button: string;
}

interface HomeFooter {
  about: string;
  login: string;
  register: string;
}

interface HomeLangData {
  metadata: Metadata;
  navbar: HomeNavbar;
  titles: HomeTitle[];
  buttonContainer: HomeButtonContainer;
  footer: HomeFooter;
  alerts: Alerts;
}

export const homeLangData: HomeLangData[] = [
  {
    metadata: { route: "/", language: "pl" },
    navbar: {
      tooltip: "Zmień język strony",
      about: "O aplikacji",
      login: "Logowanie",
      register: "Rejestracja",
    },
    titles: [
      { title: "LINGO", desc: "Nauka języka nigdy nie była prostsza" },
      {
        title: "Sprawna nauka",
        desc: "Poznaj podstawy, zacznij rozmawiać",
      },
      {
        title: "Widoczny postęp",
        desc: "Monitoruj swój progres dzięki ekstensywnym statystykom",
      },
    ],
    buttonContainer: {
      subtitle: "Naucz się już teraz!",
      button: "Rozpocznij naukę",
    },
    footer: {
      about: "O aplikacji",
      login: "Logowanie",
      register: "Rejestracja",
    },
    alerts: {
      internalServerError: "Coś poszło nie tak po naszej stronie",
    },
  },
  {
    metadata: { route: "/", language: "de" },
    navbar: {
      tooltip: "Ändern Sie die Sprache der Website",
      about: "Über die App",
      login: "Login",
      register: "Registrieren",
    },
    titles: [
      { title: "LINGO", desc: "Eine Sprache zu lernen war nie einfacher" },
      {
        title: "Effizientes Lernen",
        desc: "Lernen Sie die Grundlagen und fangen Sie an zu reden",
      },
      {
        title: "Sichtbarer Fortschritt",
        desc: "Überwachen Sie Ihren Lernfortschritt dank umfangreicher Statistiken",
      },
    ],
    buttonContainer: {
      subtitle: "Jetzt lernen!",
      button: "Fangen Sie an zu lernen",
    },
    footer: { about: "Über die App", login: "Login", register: "Registrieren" },
    alerts: {
      internalServerError: "Auf unserer Seite ist etwas schief gelaufen",
    },
  },
];
