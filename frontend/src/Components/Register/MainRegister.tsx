

function MainRegister() {
    

    return (
        <div className='main-register-wrapper'>
            <main className='main-register'>
                <h2>Zarejestruj się już teraz!</h2>
                <form className='register-form'>
                    <input 
                        type='email' 
                        name='email' 
                        placeholder='Adres Email' 
                        autoComplete='email'
                    ></input>
                    <input 
                        type='login' 
                        name='login' 
                        placeholder='Nazwa użytkownika' 
                        autoComplete='username'
                    ></input>
                    <input 
                        type='password' 
                        name='password' 
                        placeholder='Hasło' 
                        autoComplete='new-password'
                    ></input>
                    <input 
                        type='password' 
                        name='password-again' 
                        placeholder='Hasło ponownie' 
                        autoComplete='new-password'
                    ></input>
                    <input 
                        type='submit' 
                        name='submit' 
                        value='Zarejestruj'
                    ></input>
                </form>
            </main>
        </div>
    );
}

export default MainRegister;
