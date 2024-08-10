import Navbar from "../Reusables/Navbar/Navbar";
import MainLogin from "./MainLogin";
import Footer from "../Reusables/Footer/Footer";

import "./Login.scss";

function Login() {
  const linkArray: string[] = ["/about", "/register"];
  const optionsArray: string[] = ["O aplikacji", "Rejestracja"];

  const footerLinkArray: string[] = ["/about", "/login", "/register"];
  const footerOptionsArray: string[] = [
    "O aplikacji",
    "Logowanie",
    "Rejestracja",
  ];

  return (
    <>
      <div className="wrapper">
        <Navbar link={linkArray} options={optionsArray}></Navbar>
        <MainLogin></MainLogin>
        <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
      </div>
    </>
  );
}

export default Login;
