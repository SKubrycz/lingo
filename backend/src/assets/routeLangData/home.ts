// indexes: 0 -> de; _fallback: pl;

interface HomeNav {
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

interface HomeLangData {
  navbar: HomeNav[];
  titles: HomeTitle[][];
  buttonContainer: HomeButtonContainer[];
  footer: HomeNav[];
}

export const homeLangData: HomeLangData = {
  navbar: [
    {
      about: "Über die App",
      login: "Login",
      register: "Registrieren",
    },
  ],
  titles: [
    [
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
  ],
  buttonContainer: [
    { subtitle: "Jetzt lernen!", button: "Fangen Sie an zu lernen" },
  ],
  footer: [{ about: "Über die App", login: "Login", register: "Registrieren" }],
};
