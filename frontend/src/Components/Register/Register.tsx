
import NavRegister from './NavRegister';

import './Register.scss';

function Register() {

    return (
        <>
            <div className='wrapper'>
                <NavRegister></NavRegister>
                <main className='main-register-wrapper'>
                    <div className='main-register'>
                        <h2>Zarejestruj się już teraz!</h2>
                        <form className='register-form'>
                            {/* <label>Adres Email</label> */}
                            <input type='email' placeholder='Adres Email'></input>
                            {/* <label>Nazwa użytkownika</label> */}
                            <input type='login' placeholder='Nazwa użytkownika'></input>
                            {/* <label>Hasło</label> */}
                            <input type='password' placeholder='Hasło'></input>
                            {/* <label>Hasło ponownie</label> */}
                            <input type='password' placeholder='Hasło ponownie'></input>
                            <input type='submit' value='Zarejestruj'></input>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Register;