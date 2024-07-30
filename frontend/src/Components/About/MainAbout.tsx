import { Container, Box } from "@mui/material";
import { Typography } from "@mui/material";

function MainAbout() {
  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <main className="main-about">
            <div className="main-about-content">
              <Typography variant="h5">O aplikacji</Typography>
              <Box component="article">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum mauris augue, convallis id volutpat in, mattis ac
                eros. Donec commodo et magna id semper. Vivamus dapibus quam a
                placerat pellentesque. Pellentesque elementum luctus lacinia.
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
              </Box>
              <Typography variant="h6">Lorem ipsum</Typography>
              <Box component="article">
                Integer lobortis consequat nibh, nec auctor elit ullamcorper
                congue. Morbi at blandit purus, sed consectetur felis. Vivamus
                efficitur nisi sit amet eros facilisis, sit amet fringilla enim
                porttitor. Suspendisse maximus, erat vitae sodales molestie,
                nulla magna aliquam magna, sed euismod libero ante eu elit.
              </Box>
              <Typography variant="h6">Dolor sit amet</Typography>
              <Box component="article">
                Proin erat nibh, semper ut rhoncus eu, vulputate in est. Mauris
                accumsan tincidunt leo quis vulputate. Pellentesque posuere
                condimentum sem sed iaculis. Sed in lectus at eros accumsan
                vestibulum. Etiam pellentesque nibh lectus, eget imperdiet massa
                tristique sed.
              </Box>
              <Typography variant="h6">Curabitur a venenatis ipsum</Typography>
              <Box component="article">
                Suspendisse nec lorem finibus, fermentum ipsum sed, iaculis
                orci. Praesent vitae feugiat turpis, in bibendum purus. Integer
                sodales, ex ac congue sagittis, neque tellus convallis mi, ut
                mattis lorem orci sed velit. Morbi tristique sagittis nulla eu
                tristique. Aliquam facilisis ipsum vel lacus dignissim, sed
                sollicitudin arcu efficitur. Nulla eget lacus in risus maximus
                ultricies vitae nec justo. Curabitur tristique massa ac nibh
                pretium, sed viverra arcu facilisis. Quisque ac ultricies ipsum.
                Nulla sit amet libero quis nulla molestie molestie nec sed
                tortor.
              </Box>
            </div>
          </main>
        </Box>
      </Container>
    </>
  );
}

export default MainAbout;
