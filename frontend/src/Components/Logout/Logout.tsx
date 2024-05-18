import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import { useMessage } from '../..';

function Logout() {

    const { message, setMessage } = useMessage();

    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.get('http://localhost:8000/logout', { withCredentials: true })
            .then(() => {
                setMessage('Nastąpiło wylogowanie');
                navigate('/');
            }).catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        handleLogout();
    });

    return (
        <></>
    );
}

export default Logout;