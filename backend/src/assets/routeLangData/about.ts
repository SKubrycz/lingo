import { Metadata } from "./routeTypes";

interface AboutNavbar {
  tooltip: string;
  login: string;
  register: string;
}

interface AboutNavbarLogin {
  tooltip: string;
  lessons: string;
  profile: string;
  logout: string;
}

interface AboutTitle {
  title: string;
  desc: string;
}

interface AboutFooter {
  login: string;
  register: string;
}

interface AboutFooterLogin {
  lessons: string;
  profile: string;
  logout: string;
}

interface AboutLangData {
  metadata: Metadata;
  navbar: AboutNavbar;
  navbarLogin: AboutNavbarLogin;
  titles: AboutTitle[];
  footer: AboutFooter;
  footerLogin: AboutFooterLogin;
}

export const aboutLangData: AboutLangData[] = [
  {
    metadata: { route: "/about", language: "pl" },
    navbar: {
      tooltip: "Zmień język strony",
      login: "Logowanie",
      register: "Rejestracja",
    },
    navbarLogin: {
      tooltip: "Zmień język strony",
      lessons: "Lekcje",
      profile: "Profil",
      logout: "Wyloguj",
    },
    titles: [
      {
        title: "O aplikacji",
        desc: `Aplikacja LINGO to bardzo prosta w obsłudze forma nauki języka dla
              początkujących lub osób nie mających wcześniej styczności z
              językami obcymi.`,
      },
      {
        title: `Szybko rozpocznij naukę`,
        desc: `Proces rejestracji oraz logowania w serwisie jest wysoce
              intuicyjny, co sprawia, że możesz bardzo szybko i bez utrudnień
              przejść do procesu nauczania. Wszystko co potrzebne do nauki
              możesz znaleźć w odpowiednio przygotowanych lekcjach. Wystarczy
              parę kliknięć!`,
      },
      {
        title: `Interaktywne ćwiczenia`,
        desc: `Przy pomocy LINGO będziesz uczyć się języka poprzez robienie, nie
              tylko bierne pisanie lub czytanie. Takie rozwiązania w nauce
              języka pozwolą na znacznie efektywniejsze przyswojenie materiału.`,
      },
      {
        title: `Śledzenie postępu`,
        desc: `Każda przygotowana lekcja po ukończeniu zapisuje statystyki
              pokazujące jej przebieg. Obserwuj progres oraz poprawiaj błędy
              językowe celem polepszania znajomości językowych!`,
      },
    ],
    footer: {
      login: "Logowanie",
      register: "Rejestracja",
    },
    footerLogin: {
      lessons: "Lekcje",
      profile: "Profil",
      logout: "Wyloguj",
    },
  },
  {
    metadata: { route: "/about", language: "de" },
    navbar: {
      tooltip: "Ändern Sie die Sprache der Website",
      login: "Login",
      register: "Registrieren",
    },
    navbarLogin: {
      tooltip: "Ändern Sie die Sprache der Website",
      lessons: "Unterricht",
      profile: "Profil",
      logout: "Ausloggen",
    },
    titles: [
      {
        title: "Über die App",
        desc: `Die LINGO-Anwendung ist eine sehr einfach zu bedienende Form des Sprachenlernens für Anfänger oder Menschen, die noch keinen Kontakt mit Fremdsprachen haben.`,
      },
      {
        title: `Beginnen Sie schnell mit dem Lernen`,
        desc: `Der Registrierungs- und Anmeldevorgang auf der Website ist äußerst intuitiv, sodass Sie sehr schnell und problemlos mit dem Unterrichtsprozess fortfahren können. In gut vorbereiteten Lektionen finden Sie alles, was Sie zum Lernen benötigen. Mit nur wenigen Klicks!`,
      },
      {
        title: `Interaktive Übungen`,
        desc: `Mit LINGO lernen Sie eine Sprache durch Tun, nicht durch Handeln
nur passives Schreiben oder Lesen. Solche Lösungen beim Sprachenlernen ermöglichen ein wesentlich effektiveres Erlernen des Stoffes.`,
      },
      {
        title: `Fortschrittsverfolgung`,
        desc: `Für jede vorbereitete Lektion werden nach Abschluss Statistiken über den Fortschritt gespeichert. Überwachen Sie Ihre Fortschritte und korrigieren Sie Sprachfehler, um Ihre Sprachkenntnisse zu verbessern!`,
      },
    ],
    footer: {
      login: "Login",
      register: "Registrieren",
    },
    footerLogin: {
      lessons: "Unterricht",
      profile: "Profil",
      logout: "Ausloggen",
    },
  },
];
