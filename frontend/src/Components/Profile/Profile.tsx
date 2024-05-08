import Navbar from '../Reusables/Navbar/Navbar';
import MainProfile from './MainProfile';

import './Profile.scss';

function Profile() {

    const linkArray: string[] = ['/about', '/'];
    const optionsArray: string[] = ['O aplikacji', 'Lekcje'];

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