import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

interface NavbarProps {
    link: string[];
    options: string[];
}

function Navbar({ link, options }: NavbarProps) {
    const [display, setDisplay] = useState<string>('none');

    const navBurgerStyle: Object = {
        display: display
    };

    const handleDisplay = () => {
        if (display === 'none') {
            setDisplay('flex');    
        } else if (display === 'flex') {
            setDisplay('none');
        } else return;
    }

    const handleDisplayOnResize = () => {
        if (window.innerWidth > 768) setDisplay('none');
    }

    useEffect(() => {
        window.addEventListener('resize', handleDisplayOnResize)

        return () => window.removeEventListener('resize', handleDisplayOnResize);
    }, []);

    return (
        <div className='navbar-wrapper'>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo'>LOGO</Link>
                {options.map((value, index) => {
                    return (
                        <Link key={index} to={link[index]}>{value}</Link>
                    )
                })}
                <div className='navbar-burger' onClick={() => handleDisplay()}>___</div>
            </nav>
            <div className='navbar-burger-options' style={navBurgerStyle}>
                {options.map((value, index) => {
                    return (
                        <Link key={index} to={link[index]}>{value}</Link>
                    )
                })}
            </div>
        </div>
    );
}

export default Navbar;