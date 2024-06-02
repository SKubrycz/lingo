import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from '../Reusables/Navbar/Navbar';
import StateInfo from '../Reusables/StateInfo/StateInfo';
import Lesson from './Lesson';

import { useMessage } from '../..';

import './Lessons.scss';

function Lessons() {
    const [lessonNumbers, setLessonNumbers] = useState<number[]>([])

    const [linkArray, setLinkArray] = useState<string[]>(['/about', '/profile', '/logout']);
    const optionsArray: string[] = ['O aplikacji', 'Profil', 'Wyloguj'];

    const { message, setMessage } = useMessage();

    const navigate = useNavigate();

    const lessonDesc = 'Lesson description lesson description lesson description'; // leaving it here !FOR NOW

    const handleAuth = async () => {
        await axios.get('http://localhost:8000/lessons', { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setLessonNumbers(res.data.result);
                setLinkArray(['/about', `/profile/${res.data.login}`, '/logout']);
                console.log(linkArray);
            }).catch((error) => {
                console.log(error);
                setMessage('Sesja wygasła. Proszę zalogować się ponownie');
                navigate('/');
            });
    }

    useEffect(() => {
        handleAuth();
    }, []);

    return(
        <div className='wrapper'>
            <StateInfo></StateInfo>
            <Navbar link={linkArray} options={optionsArray}></Navbar>
            
            <div className='lessons-wrapper'>
                <div className='lessons-title'>All Lessons:</div>
                {lessonNumbers.map((value: number, index: number) => {
                    return (
                        <Lesson key={index} lessonNumber={value} lessonDesc={lessonDesc}></Lesson>
                    )
                })}
            </div>
        </div>
    );
}

export default Lessons;
