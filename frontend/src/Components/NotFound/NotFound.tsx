import axios from 'axios';

import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import Navbar from '../Reusables/Navbar/Navbar';

import './NotFound.scss';

function NotFound() {
    const [info, setInfo] = useState<string | null>(null);

    const linkArray: string[] = ['/'];
    const optionsArray: string[] = ['Strona główna'];

    const handleNotFound = async () => {
        await axios.get('http://localhost:8000/*')
        .catch((err) => {
            console.log(err.response.data);
            setInfo(err.response.data);
        })
    }

    useEffect(() => {
        handleNotFound();
    }, []);

    return (
        <div className='wrapper'>
            <Navbar link={linkArray} options={optionsArray}></Navbar>
            <h1>{info}</h1>
        </div>
    );
}

export default NotFound;