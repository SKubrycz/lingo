import Navbar from '../Reusables/Navbar/Navbar';

function Lessons() {

    const linkArray: string[] = ['/about', '/profile'];
    const optionsArray: string[] = ['O aplikacji', 'Profil'];

    return(
        <>
            <Navbar link={linkArray} options={optionsArray}></Navbar>
        </>
    );
}

export default Lessons;
