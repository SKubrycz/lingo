import Navbar from '../Reusables/Navbar/Navbar';

function Lessons() {

    const linkArray: string[] = ['/profile'];
    const optionsArray: string[] = ['Profil'];

    return(
        <>
            <Navbar link={linkArray} options={optionsArray}></Navbar>
        </>
    );
}

export default Lessons;