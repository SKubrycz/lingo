import Navbar from '../Reusables/Navbar/Navbar';
import MainRegister from './MainRegister';
import Footer from '../Reusables/Footer/Footer';

import './Register.scss';

function Register() {

    const linkArray: string[] = ['/about', '/login'];
    const optionsArray: string[] = ['O aplikacji', 'Logowanie'];

    const footerLinkArray: string[] = ['/about', '/login', '/register'];
    const footerOptionsArray: string[] = ['O aplikacji', 'Logowanie', 'Rejestracja'];

    return (
        <>
            <div className='wrapper'>
                <Navbar link={linkArray} options={optionsArray}></Navbar>
                <MainRegister></MainRegister>
                <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
            </div>
        </>
    );
}

export default Register;
