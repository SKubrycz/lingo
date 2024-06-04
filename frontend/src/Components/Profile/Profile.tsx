import axios from 'axios';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Navbar from '../Reusables/Navbar/Navbar';
import MainProfile from './MainProfile';

import './Profile.scss';


interface User {
    login: string;
    sessionUser: boolean;
}

function Profile() {
    const [linkArray, setLinkArray] = useState<string[]>(['/about', '/lessons']);
    const [optionsArray, setOptionsArray] = useState<string[]>(['O aplikacji', 'Lekcje']);

    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/profile`, { withCredentials: true });
                console.log(res.data);
                if (res.data.sessionUser === true) {
                    // setLinkArray(['/about', '/lessons', '/logout']);
                    // setOptionsArray(['O aplikacji', 'Lekcje', 'Wyloguj']);
                }
            } catch (error) {
                console.log('Failed to fetch current user data: ', error);
                navigate('/');
            }
        }

        fetchCurrentUser();

        const fetchUserData = async () => {
          try {
            const res = await axios.get<User>(`http://localhost:8000/profile/${userId}`, { withCredentials: true });
            console.log(res.data);

            setLinkArray(['/about', '/lessons', '/logout']);
            setOptionsArray(['O aplikacji', 'Lekcje', 'Wyloguj']);
            
            if (res.data.sessionUser === true) {
                console.log('sessionUser: ' + res.data.sessionUser);
                setUser(res.data);
            } else {
                setUser(res.data);
            }
          } catch (error) {
            console.error("Failed to fetch user data:", error);
            navigate('/');
          }
        };
    
        fetchUserData();
        
     }, [userId]);

    return (
        <>
            <div className='wrapper'>
                <Navbar link={linkArray} options={optionsArray}></Navbar>
                <MainProfile user={user}></MainProfile>
            </div>
        </>
    );
}

export default Profile;
