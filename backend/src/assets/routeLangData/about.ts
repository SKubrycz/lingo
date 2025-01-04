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
  desc?: string;
}

interface AboutFooter {
  about: string;
  login: string;
  register: string;
}

interface AboutFooterLogin {
  lessons: string;
  profile: string;
  logout: string;
}

interface AboutLangData {
  navbar: AboutNavbar;
  navbarLogin: AboutNavbarLogin;
  titles: AboutTitle[];
  footer: AboutFooter;
  footerLogin: AboutFooterLogin;
}

export const aboutLangData: (AboutLangData | Metadata)[] = [
  { route: "/about", languages: ["pl", "de"] },
  {
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
      },
    ],
    footer: {
      about: "O aplikacji",
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
      },
    ],
    footer: {
      about: "Über die App",
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
