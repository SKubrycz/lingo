import { Link } from 'react-router-dom';


interface FooterProps {
    link: string[];
    options: string[];
}

function Footer({link, options}: FooterProps) {

    return (
        <div className='main-footer-wrapper'>
            <main className='main-footer'>
                {
                    options.map((value, index) => {
                        return (
                            <Link key={index} to={link[index]}>{value}</Link>
                        )
                    })
                }
            </main>
        </div>
    )
}

export default Footer;
