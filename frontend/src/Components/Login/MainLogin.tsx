import axios from 'axios';  
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await axios.post('http://localhost:8000/login', loginData)
            .then(() => {
                navigate('/', { state: 'Zalogowano pomyślnie' });
            }).catch((error) => {
                console.log(error);
            })
    };


    return (
        <div className='main-login-wrapper'>
            <main className='main-login'>
                <h2>Zaloguj się</h2>
                <form className='login-form' method='post' onSubmit={(e) => handleSubmit(e)}>
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
