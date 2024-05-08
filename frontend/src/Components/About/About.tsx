import Navbar from '../Reusables/Navbar/Navbar';
import MainAbout from './MainAbout';

import './About.scss';

function About() {

    const linkArray: string[] = ['/login', '/register'];
    const optionsArray: string[] = ['Logowanie', 'Rejestracja'];

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