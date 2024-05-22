import { useEffect, useRef } from 'react';

interface StateInfoProps {
    message: string | undefined;
    setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function StateInfo({message, setMessage}: StateInfoProps) {
    const stateInfoRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!stateInfoRef.current) return;

        if (!message) {
            stateInfoRef.current.style.opacity = '0';
            return;
        }

        const time = 2000;

        const animationTimeout = setTimeout(() => {
            if (stateInfoRef.current) stateInfoRef.current.style.animation  = `${time}ms fadeOut ease-out 1`;
        }, time);

        const opacityTimeout = setTimeout(() => {
            if (stateInfoRef.current) stateInfoRef.current.style.opacity = '0';
            if (message) setMessage(undefined);
        }, time * 2);

        return () => {
            clearTimeout(animationTimeout);
            clearTimeout(opacityTimeout);
        }
    }, [message, setMessage]);

    return(
        <div ref={stateInfoRef} className='state-info'>{message}</div>
    );
}

export default StateInfo;