import { useState, useEffect, cloneElement } from 'react';

import { Link } from 'react-router-dom';

import BurgerIcon from '../../../assets/icons/burger.svg';
import { AppBar, Toolbar, Typography, Box, CssBaseline } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { ThemeProvider, createTheme } from '@mui/material/styles';


interface NavbarProps {
    link: string[];
    options: string[];
}

function Navbar({ link, options}: NavbarProps) {
    const [display, setDisplay] = useState<string>('none');

    const darkTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: 'rgb(230, 92, 0)',
            }
        }
    });

    const navBurgerStyle: Object = {
        display: display
    };

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
      });

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
        <>
            <Box className="navbar-color">
                <ThemeProvider theme={darkTheme}>
                <AppBar component="nav" position='fixed' elevation={trigger ? 4 : 0}>
                    <Toolbar>
                        <Typography variant='h5'
                            component='div'
                            sx={{ flexGrow: 1, display: 'block', fontFamily: 'Fira Sans', fontWeight: '500' }}
                        >
                            <Link to='/'>LOGO</Link>
                        </Typography>
                        <Box>
                            {options.map((value, index) => {
                                return (
                                    <Link key={index} to={link[index]}>{value}</Link>
                                )
                            })}
                        </Box>
                    </Toolbar>
                </AppBar>
                </ThemeProvider>
            </Box>
            {/* <div className='navbar-wrapper'>
                <nav className='navbar'>
                    <Link to='/' className='navbar-logo'>LOGO</Link>
                    {options.map((value, index) => {
                        return (
                            <Link key={index} to={link[index]}>{value}</Link>
                        )
                    })}
                    <div className='navbar-burger' onClick={() => handleDisplay()}><img src={BurgerIcon} alt='burger-icon'></img></div>
                </nav>
                <div className='navbar-burger-options' style={navBurgerStyle}>
                    {options.map((value, index) => {
                        return (
                            <Link key={index} to={link[index]}>{value}</Link>
                        )
                    })}
                </div>
            </div> */}
        </>
    );
}

export default Navbar;
