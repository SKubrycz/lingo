import { useEffect, useRef, useState } from 'react';

import { useMessage } from '../../../index';

/* interface StateInfoProps {
    message: string | undefined;
    setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
} */

function StateInfo() {
    const stateInfoRef = useRef<HTMLDivElement | null>(null);

    const { message, setMessage } = useMessage();

    const [messageViewed, setMessageViewed] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!stateInfoRef.current) return;

        if (!message || message === '') {
            stateInfoRef.current.style.opacity = '0';
            return;
        }

        setMessageViewed(message);

        if (messageViewed) setMessage(undefined);
        console.log(message);

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
    }, [message, setMessage]);

    return(
        <div ref={stateInfoRef} className='state-info'>{messageViewed}</div>
    );
}

export default StateInfo;
