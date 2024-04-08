import { Link } from 'react-router-dom';

function NavHome() {
    return (
        <nav className='home-navbar'>
            <div className='home-navbar-logo'>LOGO</div>
            <Link to='/about'>O nas</Link>
            <Link to='/login'>Logowanie</Link>
            <Link to='/register'>Rejestracja</Link>
        </nav>
    );
}

export default NavHome;