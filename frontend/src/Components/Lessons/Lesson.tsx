import { useEffect } from 'react'

import './Lessons.scss';

interface LessonProps {
    lessonNumber: number;
    lessonDesc: string;
}

function Lesson({ lessonNumber, lessonDesc }: LessonProps) {
    
    useEffect(() => {
        /*
            some fetch-lessons logic here (maybe, or: fetching from parent component)
        */
    }, []);

    return (
        <>
            <article className='lessons-lesson'>
                <div className='lessons-lesson-title'>Lekcja {lessonNumber}</div>
                <div>{lessonDesc}</div>
            </article>
        </>
    );
}

export default Lesson;
