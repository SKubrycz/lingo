import { Link } from 'react-router-dom';

interface NavbarProps {
    link: string[];
    options: string[];
}

function Navbar({ link, options }: NavbarProps) {

    return (
        <nav className='navbar'>
            <Link to='/' className='navbar-logo'>LOGO</Link>
            {options.map((value, index) => {
                return (
                    <Link key={index} to={link[index]}>{value}</Link>
                )
            })}
        </nav>
    );
}

export default Navbar;