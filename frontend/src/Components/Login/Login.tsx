import NavLogin from './NavLogin';

import './Login.scss';


function Login() {

    return (
        <>
            <div className='wrapper'>
                <NavLogin></NavLogin>
                <div className='main-login-wrapper'>
                    <main className='main-login'>
                        <h2>Zaloguj się</h2>
                        <form className='login-form'>
                            {/* <label>Nazwa użytkownika</label> */}
                            <input type='login' placeholder='Nazwa użytkownika'></input>
                            {/* <label>Hasło</label> */}
                            <input type='password' placeholder='Hasło'></input>
                            <input type='submit' value='Zaloguj'></input>
                        </form>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Login;