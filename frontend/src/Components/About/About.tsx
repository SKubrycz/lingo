
import NavAbout from './NavAbout';
import MainAbout from './MainAbout';

import './About.scss';

function About() {

    return (
        <>
            <div className='wrapper'>
                <NavAbout></NavAbout>
                <MainAbout></MainAbout>
            </div>
        </>
    );
}

export default About;