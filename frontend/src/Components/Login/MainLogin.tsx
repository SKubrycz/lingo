

function MainLogin() {

    return (
        <div className='main-login-wrapper'>
            <main className='main-login'>
                <h2>Zaloguj się</h2>
                <form className='login-form'>
                    {/* <label>Nazwa użytkownika</label> */}
                    <input type='login' name='login' placeholder='Nazwa użytkownika' autoComplete='username'></input>
                    {/* <label>Hasło</label> */}
                    <input type='password' name='password' placeholder='Hasło' autoComplete='current-password'></input>
                    <input type='submit' name='submit' value='Zaloguj'></input>
                </form>
            </main>
        </div>
    );
}

export default MainLogin;
