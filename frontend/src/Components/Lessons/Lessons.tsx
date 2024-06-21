import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from '../Reusables/Navbar/Navbar';
import StateInfo from '../Reusables/StateInfo/StateInfo';
import Lesson from './Lesson';

import { useMessage } from '../..';

import './Lessons.scss';
import Footer from '../Reusables/Footer/Footer';

function Lessons() {
    const [lessonNumbers, setLessonNumbers] = useState<number[]>([])

    const [linkArray, setLinkArray] = useState<string[]>(['/about', '/profile', '/logout']);
    const optionsArray: string[] = ['O aplikacji', 'Profil', 'Wyloguj'];

    const footerLinkArray: string[] = ['/about', '/login', '/register'];
    const footerOptionsArray: string[] = ['O aplikacji', 'Logowanie', 'Rejestracja'];

    const { message, setMessage } = useMessage();

    const navigate = useNavigate();

    const lessonDesc = 'Opis lekcji: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac tempus velit. Maecenas et feugiat tortor. Nam accumsan enim at diam euismod, id sodales felis dignissim.'; // leaving it here !FOR NOW

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

    const lessonStyle = {
        animation: `0.6s comeUpLeft ease-out 1`,
        animationDelay: '',
    };

    return (
        <div className='wrapper'>
            <StateInfo></StateInfo>
            <Navbar link={linkArray} options={optionsArray}></Navbar>
            
            <div className='lessons-wrapper'>
                <div className='lessons-title'>Wszystkie lekcje:</div>
                {lessonNumbers.map((value: number, index: number) => {
                    const numLessons = lessonNumbers.length;
                    const animationDelay = `${(index / ((numLessons - 1) * 2)) - 0.25}s`;
                    console.log(`${index}: ${animationDelay}`);

                    return (
                        <Lesson 
                            key={index} 
                            lessonNumber={value} 
                            lessonDesc={lessonDesc}
                            lessonStyle={{...lessonStyle, animationDelay}}
                        ></Lesson>
                    )
                })}
            </div>
            <Footer link={footerLinkArray} options={footerOptionsArray}></Footer>
        </div>
    );
}

export default Lessons;