import { Alerts, Metadata } from "./routeTypes";

interface LoginNavbar {
  tooltip: string;
  about: string;
  register: string;
}

interface LoginMain {
  title: string;
  loginPlaceholder: string;
  passwordPlaceholder: string;
  button: string;
}

interface LoginFooter {
  about: string;
  login: string;
  register: string;
}

interface LoginLangData {
  metadata: Metadata;
  navbar: LoginNavbar;
  main: LoginMain;
  footer: LoginFooter;
  alerts: Alerts;
}

export const loginLangData: LoginLangData[] = [
  {
    metadata: { route: "/login", language: "pl" },
    navbar: {
      tooltip: "Zmień język strony",
      about: "O aplikacji",
      register: "Rejestracja",
    },
    main: {
      title: "Zaloguj się",
      loginPlaceholder: "Nazwa użytkownika",
      passwordPlaceholder: "Hasło",
      button: "Zaloguj",
    },
    footer: {
      about: "O aplikacji",
      login: "Logowanie",
      register: "Rejestracja",
    },
    alerts: {
      ok: "Zalogowano",
      badRequest: "Niepoprawne hasło",
      notFound: "Nie znaleziono użytkownika",
      internalServerError: "Coś poszło nie tak po naszej stronie",
    },
  },
  {
    metadata: { route: "/login", language: "de" },
    navbar: {
      tooltip: "Ändern Sie die Sprache der Website",
      about: "Über die App",
      register: "Registrieren",
    },
    main: {
      title: "Login",
      loginPlaceholder: "Benutzername",
      passwordPlaceholder: "Passwort",
      button: "Einloggen",
    },
    footer: {
      about: "Über die App",
      login: "Login",
      register: "Registrieren",
    },
    alerts: {
      ok: "Eingeloggt",
      badRequest: "Falsches Passwort",
      notFound: "Benutzer nicht gefunden",
      internalServerError: "Auf unserer Seite ist etwas schief gelaufen",
    },
  },
];
