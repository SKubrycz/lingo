import { Link } from 'react-router-dom';

function NavRegister() {
    return (
        <nav className='navbar'>
            <Link to='/' className='navbar-logo'>LOGO</Link>
            <Link to='/about'>O nas</Link>
            <Link to='/login'>Logowanie</Link>
        </nav>
    );
}

export default NavRegister;