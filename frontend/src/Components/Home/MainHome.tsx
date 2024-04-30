import { useEffect, useRef, useReducer } from 'react';

import StartHome from './StartHome';

import { useMessage } from '../../';

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


    const homeStateRef = useRef<HTMLDivElement | null>(null);
    const helloRef = useRef<HTMLHeadingElement>(null);

    const { message } = useMessage();


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

    useEffect(() => {
        if (!homeStateRef.current) return;

        if (!message) {
            homeStateRef.current.style.opacity = '0';
            return;
        }

        const time = 2000;

        const animationTimeout = setTimeout(() => {
            if (homeStateRef.current) homeStateRef.current.style.animation  = `${time}ms fadeOut ease-out 1`;
        }, time);

        const opacityTimeout = setTimeout(() => {
            if (homeStateRef.current) homeStateRef.current.style.opacity = '0';
        }, time * 2);

        return () => {
            clearTimeout(animationTimeout);
            clearTimeout(opacityTimeout);
        }
    }, [message]);

    return (
        <main className='home-main'>
            <div ref={homeStateRef} className='home-state-info'>{message}</div>
            <h1 ref={helloRef}>LOGO</h1>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum pulvinar libero non blandit. Nulla suscipit mi et ipsum egestas elementum.</h3>
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