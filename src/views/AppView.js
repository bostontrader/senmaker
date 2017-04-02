import React from 'react'

import syllabus from '../data/syllabus/Syllabus'

//import Intro from './syllabus/Intro'
//import Level01 from './Level01'
//import Level02 from './Level02'
//import Level03 from './Level03'
//import Level04 from './Level04'
//import Level05 from './Level05'
//import Level06 from './Level06'
//import Level07 from './Level07'

function AppView(props) {

    const currentLesson = props.app.getIn(['level', 'currentLesson'])
    const SpecificLesson = syllabus[currentLesson]

    return (
        <div className="container">
            <div className="row">
                <SpecificLesson {...props} />
            </div>
        </div>
    )

}

export default AppView
