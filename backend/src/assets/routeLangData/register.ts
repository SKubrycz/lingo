import { Metadata } from "./routeTypes";

interface RegisterNavbar {
  tooltip: string;
  about: string;
  login: string;
}

interface WithTooltip {
  placeholder: string;
  tooltip: string;
}

interface RegisterMain {
  title: string;
  emailPlaceholder: string;
  loginPlaceholder: WithTooltip;
  passwordPlaceholder: WithTooltip;
  passwordAgainPlaceholder: WithTooltip;
  button: string;
}

interface RegisterFooter {
  about: string;
  login: string;
  register: string;
}
interface RegisterLangData {
  navbar: RegisterNavbar;
  main: RegisterMain;
  footer: RegisterFooter;
}

export const registerLangData: (RegisterLangData | Metadata)[] = [
  { route: "/register", languages: ["pl", "de"] },
  {
    navbar: {
      tooltip: "Zmień język strony",
      about: "O aplikacji",
      login: "Logowanie",
    },
    main: {
      title: "Rejestracja",
      emailPlaceholder: "Adres Email",
      loginPlaceholder: {
        placeholder: "Nazwa użytkownika",
        tooltip: "Nazwa użytkownika musi być dłuższa niż 3 znaki",
      },
      passwordPlaceholder: {
        placeholder: "Hasło",
        tooltip:
          "Hasło musi być dłuższe niż 7 znaków, posiadać przynajmniej jedną dużą i małą literę, cyfrę oraz znak specjalny",
      },
      passwordAgainPlaceholder: {
        placeholder: "Hasło ponownie",
        tooltip:
          "Hasło musi być dłuższe niż 7 znaków, posiadać przynajmniej jedną dużą i małą literę, cyfrę oraz znak specjalny",
      },
      button: "Zarejestruj",
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
      login: "Login",
    },
    main: {
      title: "Registrieren",
      emailPlaceholder: "E-Mail-Adresse",
      loginPlaceholder: {
        placeholder: "Benutzername",
        tooltip: "Der Benutzername muss länger als 3 Zeichen sein",
      },
      passwordPlaceholder: {
        placeholder: "Passwort",
        tooltip:
          "Das Passwort muss länger als 7 Zeichen sein und mindestens einen Groß- und Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten",
      },
      passwordAgainPlaceholder: {
        placeholder: "Passwort erneut",
        tooltip:
          "Das Passwort muss länger als 7 Zeichen sein und mindestens einen Groß- und Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten",
      },
      button: "Registrieren",
    },
    footer: {
      about: "Über die App",
      login: "Login",
      register: "Registrieren",
    },
  },
];
