import { Alerts, Metadata } from "./routeTypes";

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

export interface RegisterMail {
  subject: string;
  content: RegisterMailContent;
}

interface RegisterMailContent {
  verifyTitle: string;
  instruction: string;
}

interface RegisterLangData {
  metadata: Metadata;
  navbar: RegisterNavbar;
  main: RegisterMain;
  footer: RegisterFooter;
  alerts: Alerts;
  mail: RegisterMail;
}

export const registerLangData: RegisterLangData[] = [
  {
    metadata: { route: "/register", language: "pl" },
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
    alerts: {
      ok: "Zarejestrowano",
      badRequest: "Hasła nie są takie same",
      unprocessableContent: [
        "Należy wypełnić wszystkie pola formularza",
        "Użytkownik już istnieje",
        "Nazwa użytkownika musi być dłuższa niż 3 znaki",
        "Hasło niepoprawne",
        "Powtórzone hasło niepoprawne",
        "Hasło musi być dłuższe niż 7 znaków, posiadać przynajmniej jedną dużą i małą literę, cyfrę oraz znak specjalny",
      ],
      internalServerError: "Coś poszło nie tak po naszej stronie",
    },
    mail: {
      subject: "Weryfikacja konta Lingo",
      content: {
        verifyTitle: "Twój kod weryfikacyjny",
        instruction: `Należy go wpisać w okienku weryfikacji
        <i style="color: rgb(230, 92, 0)">Lingo</i>`,
      },
    },
  },
  {
    metadata: { route: "/register", language: "de" },
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
    alerts: {
      ok: "Registriert",
      badRequest: "Passwörter sind nicht dasselbe",
      unprocessableContent: [
        "Alle Felder des Formulars müssen ausgefüllt werden",
        "Benutzer existiert bereits",
        "Der Nutzername muss länger als 3 Zeichen sein",
        "Passwort falsch",
        "Wiederholtes Passwort falsch",
        "Das Passwort muss länger als 7 Zeichen sein, mindestens einen Groß- und Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten",
      ],
      internalServerError: "Auf unserer Seite ist etwas schief gelaufen",
    },
    mail: {
      subject: "Lingo-Kontoüberprüfung",
      content: {
        verifyTitle: "Ihr Verifizierungscode",
        instruction: `Es sollte in das Feld für die <i style="color: rgb(230, 92, 0)">Lingo</i>-Überprüfung eingegeben werden`,
      },
    },
  },
];
