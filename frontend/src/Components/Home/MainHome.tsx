import { useEffect, useRef, useReducer } from 'react';

import StartHome from './StartHome';

function reducer(state: any, action: any) {
    switch(action.type) {
        case 'seconds':
            return {
                ...state,
                seconds: (state.seconds + 1) % 60
            };
        case 'minutes':
            return {
                ...state,
                minutes: (state.minutes + 1) % 60
            };
        case 'hours':
            return {
                ...state,
                hours: (state.hours + 1) % 24
            };
        default:
            throw Error('No such action');
    }
}

function MainHome() {
    const [state, dispatch] = useReducer(reducer, {
        seconds: 0,
        minutes: 0,
        hours: 0,
    });

    const helloRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const intervalSec = setInterval(() => {
            dispatch({type: 'seconds'});
        }, 1000);
        const intervalMin = setInterval(() => {
            dispatch({type: 'minutes'});
        }, 60 * 1000);
        const intervalHour = setInterval(() => {
            dispatch({type: 'hours'});
        }, 60 * 60 * 1000);

        return () => {
            clearInterval(intervalSec);
            clearInterval(intervalMin);
            clearInterval(intervalHour);
        }
    }, []);

    return (
        <main className='home-main'>
            <h1 ref={helloRef}>LOGO</h1>
            <h3>An app that will teach you language in a convenient and easy way!</h3>
            <div>
                {state.hours < 10 ? 0 : ''}{state.hours}:
                {state.minutes < 10 ? 0 : ''}{state.minutes}:
                {state.seconds < 10 ? 0 : ''}{state.seconds}
            </div>
            <StartHome></StartHome>
        </main>
    );
}

export default MainHome;