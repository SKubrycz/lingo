import { useEffect } from 'react'

import './Lessons.scss';

function Lesson() {
    
    useEffect(() => {
        /*
            some fetch-lessons logic here
        */
    })

    return (
        <>
            <article className='lessons-lesson'>
                <div className='lessons-lesson-title'>Lesson 1</div>
                <div>Lesson description lesson description</div>
            </article>
        </>
    );
}

export default Lesson;