
import './Register.scss';

function Register() {

    return (
        <>
            <div className='wrapper'>
                <main className='main-register-wrapper'>
                    <div className='main-register'>
                        <h2>Zarejestruj się już teraz!</h2>
                        <form>
                            <label>Adres Email</label>
                            <input type='email'></input>
                            <label>Nazwa użytkownika</label>
                            <input type='login'></input>
                            <label>Hasło</label>
                            <input type='password'></input>
                            <label>Hasło ponownie</label>
                            <input type='password'></input>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Register;