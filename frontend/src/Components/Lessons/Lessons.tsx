import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Navbar from '../Reusables/Navbar/Navbar';

import './Lessons.scss';

function Lessons() {

    const linkArray: string[] = ['/about', '/profile'];
    const optionsArray: string[] = ['O aplikacji', 'Profil'];

    const navigate = useNavigate();

    return(
        <>
            <Navbar link={linkArray} options={optionsArray}></Navbar>
        </>
    );
}

export default Lessons;
