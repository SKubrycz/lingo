
import NavRegister from './NavRegister';
import MainRegister from './MainRegister';

import './Register.scss';

function Register() {

    return (
        <>
            <div className='wrapper'>
                <NavRegister></NavRegister>
                <MainRegister></MainRegister>
            </div>
        </>
    );
}

export default Register;