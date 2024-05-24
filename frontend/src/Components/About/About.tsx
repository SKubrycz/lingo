import axios from 'axios';
import { useState, useEffect } from 'react';

import Navbar from '../Reusables/Navbar/Navbar';
import MainAbout from './MainAbout';

import './About.scss';

function About() {

    const [linkArray, setLinkArray] = useState<string[]>(['/login', '/register']);
    const [optionsArray, setOptionsArray] = useState<string[]>(['Logowanie', 'Rejestracja']);

    const handleAuth = () => {
        axios.get('http://localhost:8000/about', { withCredentials: true })
            .then((res) => {
                console.log(res.data.login);
                if (res.data.login) {
                    setLinkArray(['/lessons', `/profile/${res.data.login}`]);
                    setOptionsArray(['Lekcje', 'Profil']);
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        handleAuth();
    }, [])

    return (
        <>
            <div className='wrapper'>
                <Navbar link={linkArray} options={optionsArray}></Navbar>
                <MainAbout></MainAbout>
            </div>
        </>
    );
}

export default About;
