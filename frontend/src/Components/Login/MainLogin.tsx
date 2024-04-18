import axios from 'axios'

import { useReducer } from 'react';


type LoginState = {
    login: string;
    password: string;
}

enum ActionType {
    Login = 'login',
    Password = 'password',
}

interface LoginActions {
    type: ActionType;
    payload?: string;
}


const loginReducer = (state: LoginState, action: LoginActions) => {
    const { type, payload } = action;
    switch (type) {
        case ActionType.Login:
            console.log(state.login);
            return {
                ...state,
                login: payload || '',
            };
        case ActionType.Password:
            console.log(state.password);
            return {
                ...state,
                password: payload || '',
            };
        default:
            throw new Error(`No such action: ${action.type}`);
    }
}

function MainLogin() {

    const [loginData, loginDispatch] = useReducer(loginReducer, {
        login: '',
        password: '',
    });

    const handleLoginData = async (route: string, sentData: Object) => {
        await axios.post(route, sentData
        ).then(() => {
            console.log('posted Login');
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLoginData('/login', loginData);
      };


    return (
        <div className='main-login-wrapper'>
            <main className='main-login'>
                <h2>Zaloguj się</h2>
                <form className='login-form' method='post' onSubmit={() => handleSubmit}>
                    <input 
                        type='login' 
                        name='login' 
                        onChange={(e) => loginDispatch({type: ActionType.Login, payload: e.target.value})} 
                        placeholder='Nazwa użytkownika' 
                        autoComplete='username'
                    ></input>
                    <input 
                        type='password' 
                        name='password' 
                        onChange={(e)=> loginDispatch({type: ActionType.Password, payload: e.target.value})} 
                        placeholder='Hasło' 
                        autoComplete='current-password'
                        ></input>
                    <input 
                        type='submit' 
                        name='submit' 
                        value='Zaloguj'
                    ></input>
                </form>
            </main>
        </div>
    );
}

export default MainLogin;