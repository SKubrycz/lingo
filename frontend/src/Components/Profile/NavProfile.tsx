import { Link } from 'react-router-dom';

function NavProfile() {
    return (
        <nav className='navbar'>
            <Link to='/' className='navbar-logo'>LOGO</Link>
            <Link to='/about'>O aplikacji</Link>
            <Link to='/'>Lekcje</Link>
        </nav>
    );
}

export default NavProfile;