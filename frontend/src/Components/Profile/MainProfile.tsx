import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

interface User {
    login: string;
    sessionUser: boolean;
}

function MainProfile() {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/profile`, { withCredentials: true });
                console.log(res.data);
                /* if (res.data.sessionUser === true) {
                    navigate(`/profile/${res.data.login}`);
                } else {
                    navigate(`/profile/${userId}`);
                } */
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
            if (res.data.sessionUser === true) {
                console.log('sessionUser: ' + res.data.sessionUser);
                setUser(res.data);
            } else {
                setUser(res.data);
            }
          } catch (error) {
            console.error("Failed to fetch user data:", error);
          }
        };
    
        fetchUserData();
        
     }, [userId]);

    return (
        <div className='main-profile-wrapper'>
            <main className='main-profile'>
                <article className='main-profile-user'>
                    <div className='profile-user-img'>{user?.login} {(user?.sessionUser) ? '(Ty)' : undefined}</div>
                    <p>{user?.login} {(user?.sessionUser) ? '(Ty)' : undefined}</p>
                </article>
                <article className='main-profile-stats'>
                    <div className='main-profile-stat-container'>
                        <div>Stat1:</div>
                        <div>123</div>
                    </div>
                    <div className='main-profile-stat-container'>
                        <div>Stat2:</div>
                        <div>238759</div>
                    </div>
                    <div className='main-profile-stat-container'>
                        <div>Stat3:</div>
                        <div>10074</div>
                    </div>
                    <div className='main-profile-stat-container'>
                        <div>Stat4:</div>
                        <div>251h</div>
                    </div>
                </article>
            </main>
        </div>
    );
}

export default MainProfile;
