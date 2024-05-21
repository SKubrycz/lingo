import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import Navbar from '../Reusables/Navbar/Navbar';
import Lesson from './Lesson';

import { useMessage } from '../..';

import './Lessons.scss';

function Lessons() {
    const lessonsStateRef = useRef<HTMLDivElement | null>(null);
    const [lessonNumbers, setLessonNumbers] = useState<number[]>([])

    const linkArray: string[] = ['/about', '/profile', '/logout'];
    const optionsArray: string[] = ['O aplikacji', 'Profil', 'Wyloguj'];

    const { message, setMessage } = useMessage();

    const navigate = useNavigate();

    const lessonDesc = 'Lesson description lesson description'; // leaving it here !FOR NOW

    useEffect(() => {
        if (!lessonsStateRef.current) return;

        if (!message || message === '') {
            lessonsStateRef.current.style.opacity = '0';
            return;
        }

        const time = 2000;

        const animationTimeout = setTimeout(() => {
            if (lessonsStateRef.current) lessonsStateRef.current.style.animation  = `${time}ms fadeOut ease-out 1`;
        }, time);

        const opacityTimeout = setTimeout(() => {
            if (lessonsStateRef.current) lessonsStateRef.current.style.opacity = '0';
            if (message) setMessage(undefined);
        }, time * 2);

        return () => {
            clearTimeout(animationTimeout);
            clearTimeout(opacityTimeout);
        }
    }, [message, setMessage]);


    const handleAuth = async () => {
        await axios.get('http://localhost:8000/lessons', { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setLessonNumbers(res.data);
            }).catch((error) => {
                console.log(error);
                setMessage('Sesja wygasła. Proszę zalogować się ponownie')
                navigate('/');
            });
    }

    useEffect(() => {
        handleAuth();
    }, []);

    return(
        <>
            <div ref={lessonsStateRef} className='state-info'>{message}</div>
            <Navbar link={linkArray} options={optionsArray}></Navbar>
            <div className='wrapper'>
                <div className='lessons-wrapper'>
                    <div className='lessons-title'>All Lessons:</div>
                    {lessonNumbers.map((value: number, index: number) => {
                        return (
                            <Lesson key={index} lessonNumber={value} lessonDesc={lessonDesc}></Lesson>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default Lessons;
