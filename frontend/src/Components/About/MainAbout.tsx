import { Container, Box } from "@mui/material";
import { Typography } from "@mui/material";

interface MainAboutProps {
  languageData: any;
}

function MainAbout({ languageData }: MainAboutProps) {
  return (
    <>
      <Container maxWidth="lg">
        <Box component="main" className="main-about">
          <Box component="div" className="main-about-content">
            <Typography variant="h5">
              {languageData ? languageData[0]?.title : "O aplikacji"}
            </Typography>
            <Box component="article">
              {languageData
                ? languageData[0]?.desc
                : `Aplikacja LINGO to bardzo prosta w obsłudze forma nauki języka dla
              początkujących lub osób nie mających wcześniej styczności z
              językami obcymi.`}
            </Box>
            <Typography variant="h6">
              {languageData
                ? languageData[1]?.title
                : `Szybko rozpocznij naukę`}
            </Typography>
            <Box component="article">
              {languageData
                ? languageData[1]?.desc
                : `Proces rejestracji oraz logowania w serwisie jest wysoce
              intuicyjny, co sprawia, że możesz bardzo szybko i bez utrudnień
              przejść do procesu nauczania. Wszystko co potrzebne do nauki
              możesz znaleźć w odpowiednio przygotowanych lekcjach. Wystarczy
              parę kliknięć!`}
            </Box>
            <Typography variant="h6">
              {languageData ? languageData[2]?.title : `Interaktywne ćwiczenia`}
            </Typography>
            <Box component="article">
              {languageData
                ? languageData[2]?.desc
                : `Przy pomocy LINGO będziesz uczyć się języka poprzez robienie, nie
              tylko bierne pisanie lub czytanie. Takie rozwiązania w nauce
              języka pozwolą na znacznie efektywniejsze przyswojenie materiału.`}
            </Box>
            <Typography variant="h6">
              {languageData ? languageData[3]?.title : `Śledzenie postępu`}
            </Typography>
            <Box component="article">
              {languageData
                ? languageData[3]?.desc
                : `Każda przygotowana lekcja po ukończeniu zapisuje statystyki
              pokazujące jej przebieg. Obserwuj progres oraz poprawiaj błędy
              językowe celem polepszania znajomości językowych!`}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default MainAbout;
