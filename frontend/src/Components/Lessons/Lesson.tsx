import { useEffect } from 'react'

import './Lessons.scss';

interface LessonProps {
    lessonNumber: number;
    lessonDesc: string;
    lessonStyle: Object;
}

function Lesson({ lessonNumber, lessonDesc, lessonStyle }: LessonProps) {
    
    useEffect(() => {
        /*
            some fetch-lessons logic here (maybe, or: fetching from parent component)
        */
    }, []);

    return (
        <>
            <article className='lessons-lesson'>
                <div className='lessons-lesson-title' style={lessonStyle}>Lekcja {lessonNumber}</div>
                <div style={lessonStyle}>{lessonDesc}</div>
            </article>
        </>
    );
}

export default Lesson;
