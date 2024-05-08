import Navbar from '../Reusables/Navbar/Navbar';
import MainRegister from './MainRegister';

import './Register.scss';

function Register() {

    const linkArray: string[] = ['/about', '/login'];
    const optionsArray: string[] = ['O aplikacji', 'Logowanie'];

    return (
        <>
            <div className='wrapper'>
                <Navbar link={linkArray} options={optionsArray}></Navbar>
                <MainRegister></MainRegister>
            </div>
        </>
    );
}

export default Register;