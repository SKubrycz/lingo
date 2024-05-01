import NavProfile from './NavProfile';
import MainProfile from './MainProfile';

import './Profile.scss';

function Profile() {

    return (
        <>
            <div className='wrapper'>
                <NavProfile></NavProfile>
                <MainProfile></MainProfile>
            </div>
        </>
    );
}

export default Profile;