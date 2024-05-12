import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Navbar from '../Reusables/Navbar/Navbar';
import MainProfile from './MainProfile';

import './Profile.scss';

function Profile() {

    const linkArray: string[] = ['/about', '/lessons'];
    const optionsArray: string[] = ['O aplikacji', 'Lekcje'];

    const navigate = useNavigate();

    return (
        <>
            <div className='wrapper'>
                <Navbar link={linkArray} options={optionsArray}></Navbar>
                <MainProfile></MainProfile>
            </div>
        </>
    );
}

export default Profile;