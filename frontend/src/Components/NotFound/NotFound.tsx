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
            <main className='main-notfound'>
                <h1>{info}</h1>
                <h3>Niestety, nie znaleźliśmy tego czego szukasz...</h3>
                <h3>...ale zawsze możesz poszukać gdzie indziej...</h3>
                <h3>...na przykład na stronie głównej!</h3><br></br>
                <h2>Powrót na stronę główną:</h2>
                <button className='main-notfound-button'><Link to='/'>Strona główna</Link></button>
            </main>
        </div>
    );
}

export default NotFound;
