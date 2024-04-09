import { Link } from 'react-router-dom';

function NavHome() {
    return (
        <nav className='home-navbar'>
            <Link to='/' className='home-navbar-logo'>LOGO</Link>
            <Link to='/about'>O nas</Link>
            <Link to='/login'>Logowanie</Link>
            <Link to='/register'>Rejestracja</Link>
        </nav>
    );
}

export default NavHome;