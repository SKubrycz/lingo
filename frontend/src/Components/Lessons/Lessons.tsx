import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import Navbar from '../Reusables/Navbar/Navbar';
import Lesson from './Lesson';

import { useMessage } from '../..';

import './Lessons.scss';

function Lessons() {
    const lessonsStateRef = useRef<HTMLDivElement | null>(null);

    const linkArray: string[] = ['/about', '/profile', '/logout'];
    const optionsArray: string[] = ['O aplikacji', 'Profil', 'Wyloguj'];

    const { message, setMessage } = useMessage();

    const navigate = useNavigate();

    useEffect(() => {
        if (!lessonsStateRef.current) return;

        if (!message) {
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
            }).catch((error) => {
                console.log(error);
                setMessage('Sesja wygasła. Proszę zalogować się ponownie')
                navigate('/');
            });
    }

    useEffect(() => {
        handleAuth();
    }, []);


    const lessonDesc = 'Lesson description lesson description'; // leaving it here !FOR NOW

    return(
        <>
            <div ref={lessonsStateRef} className='state-info'>{message}</div>
            <Navbar link={linkArray} options={optionsArray}></Navbar>
            <div className='wrapper'>
                <div className='lessons-wrapper'>
                    <div className='lessons-title'>All Lessons:</div>
                    <Lesson lessonNumber={1} lessonDesc={lessonDesc}></Lesson>
                    <Lesson lessonNumber={2} lessonDesc={lessonDesc}></Lesson>
                    <Lesson lessonNumber={3} lessonDesc={lessonDesc}></Lesson>
                </div>
            </div>
        </>
    );
}

export default Lessons;