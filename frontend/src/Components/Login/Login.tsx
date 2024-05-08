import Navbar from '../Reusables/Navbar/Navbar';
import MainLogin from './MainLogin';

import './Login.scss';


function Login() {

    const linkArray: string[] = ['/about', '/register'];
    const optionsArray: string[] = ['O aplikacji', 'Rejestracja'];

    return (
        <>
            <div className='wrapper'>
                <Navbar link={linkArray} options={optionsArray}></Navbar>
                <MainLogin></MainLogin>
            </div>
        </>
    );
}

export default Login;