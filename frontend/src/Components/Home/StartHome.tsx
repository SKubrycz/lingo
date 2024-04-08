import { Link } from 'react-router-dom';

function StartHome() {

    return (
        <article className='home-start'>
            <p>Naucz się już teraz!</p>
            <Link to='/register'><button>Rozpocznij naukę</button></Link>
        </article>
    );
}

export default StartHome;