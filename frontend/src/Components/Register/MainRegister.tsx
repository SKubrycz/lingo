import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useEffect, useReducer, useState } from 'react';

import { useMessage } from '../../';

type RegisterState = {
    email: string;
    login: string;
    password: string;
    passwordAgain: string;
}

enum ActionType {
    Email = 'email',
    Login = 'login',
    Password = 'password',
    PasswordAgain = 'passwordAgain',
}

interface RegisterActions {
    type: ActionType;
    payload?: string;
}


const loginReducer = (state: RegisterState, action: RegisterActions) => {
    const { type, payload } = action;
    switch (type) {
        case ActionType.Email:
            console.log(state.email);
            return {
                ...state,
                email: payload || '',
            };
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
        case ActionType.PasswordAgain:
            console.log(state.passwordAgain);
            return {
                ...state,
                passwordAgain: payload || '',
            }
        default:
            throw new Error(`No such action: ${action.type}`);
    }
}

function MainRegister() {
    const [registerData, registerDispatch] = useReducer(loginReducer, {
        email: '',
        login: '',
        password: '',
        passwordAgain: '',
    });

    const [error, setError] = useState<string | null>();

    const navigate = useNavigate();

    const { message, setMessage } = useMessage();

    useEffect(() => {
        setMessage(undefined);
    }, [message, setMessage]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await axios.post('http://localhost:8000/register', registerData)
            .then(() => {
                setMessage('Rejestracja przebiegła pomyślnie');
                console.log(message);
                navigate('/', { state: 'Rejestracja przebiegła pomyślnie' });
            }).catch((error) => {
                setError(error.response.data);
                console.log(error);
            })
    };

    return (
        <div className='main-register-wrapper'>
            <main className='main-register'>
                <h2 className='main-register-title'>Zarejestruj się już teraz!</h2>
                <h3 className='error-text'>{error}</h3>
                <form className='register-form' onSubmit={(e) => handleSubmit(e)}>
                    <input 
                        type='email' 
                        name='email' 
                        onChange={(e) => registerDispatch({type: ActionType.Email, payload: e.target.value})}
                        placeholder='Adres Email' 
                        autoComplete='email'
                    ></input>
                    <input 
                        type='login' 
                        name='login' 
                        onChange={(e) => registerDispatch({type: ActionType.Login, payload: e.target.value})}
                        placeholder='Nazwa użytkownika' 
                        autoComplete='username'
                    ></input>
                    <input 
                        type='password' 
                        name='password'
                        onChange={(e) => registerDispatch({type: ActionType.Password, payload: e.target.value})}
                        placeholder='Hasło' 
                        autoComplete='new-password'
                    ></input>
                    <input 
                        type='password' 
                        name='password-again' 
                        onChange={(e) => registerDispatch({type: ActionType.PasswordAgain, payload: e.target.value})}
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