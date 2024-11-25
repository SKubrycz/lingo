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

export const loginLangData: LoginLangData[] = [
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
