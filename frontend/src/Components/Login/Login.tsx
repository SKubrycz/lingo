import NavLogin from './NavLogin';
import MainLogin from './MainLogin';

import './Login.scss';


function Login() {

    return (
        <>
            <div className='wrapper'>
                <NavLogin></NavLogin>
                <MainLogin></MainLogin>
            </div>
        </>
    );
}

export default Login;