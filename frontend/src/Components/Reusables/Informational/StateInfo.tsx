import { useEffect, useRef, useState } from 'react';

import { useMessage } from '../../../index';

function StateInfo() {
    const stateInfoRef = useRef<HTMLDivElement | null>(null);

    const { message, setMessage } = useMessage();

    const [messageViewed, setMessageViewed] = useState<string | undefined>(undefined);

    const handleMessageViewed = async () => {
        setMessageViewed(message);
        return setMessage(undefined);
    }

    useEffect(() => {
        if (!stateInfoRef.current) return;

        if (!message || message === '') {
            stateInfoRef.current.style.opacity = '0';
            return;
        }

        handleMessageViewed(); // set context data to a useState and set context data to undefined

        const time = 2000;

        const animationTimeout = setTimeout(() => {
            if (stateInfoRef.current) stateInfoRef.current.style.animation  = `${time}ms fadeOut ease-out 1`;
        }, time);

        const opacityTimeout = setTimeout(() => {
            if (stateInfoRef.current) stateInfoRef.current.style.opacity = '0';
        }, time * 2);

        return () => {
            clearTimeout(animationTimeout);
            clearTimeout(opacityTimeout);
        }
    }, []);

    return(
        <div ref={stateInfoRef} className='state-info'>{messageViewed}</div>
    );
}

export default StateInfo;