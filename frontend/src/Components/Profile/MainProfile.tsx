interface User {
    login: string;
    sessionUser: boolean;
}

function MainProfile({user}: {user: User | null}) {

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
