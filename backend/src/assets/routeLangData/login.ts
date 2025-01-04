import { Metadata } from "./routeTypes";

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
  navbar: LoginNavbar;
  main: LoginMain;
  footer: LoginFooter;
}

export const loginLangData: (LoginLangData | Metadata)[] = [
  { route: "/login", languages: ["pl", "de"] },
  {
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
  },
  {
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
  },
];
