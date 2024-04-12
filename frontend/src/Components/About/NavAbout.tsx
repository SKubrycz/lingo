import { Link } from 'react-router-dom';

function NavAbout() {
    return (
        <nav className='navbar'>
            <Link to='/' className='navbar-logo'>LOGO</Link>
            <Link to='/login'>Logowanie</Link>
            <Link to='/register'>Rejestracja</Link>
        </nav>
    );
}

export default NavAbout;