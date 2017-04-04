import React from 'react'

import syllabus from '../data/syllabus/Syllabus'

function AppView(props) {

    const currentLesson = props.app.getIn(['level', 'currentLesson'])
    const SpecificLesson = syllabus[currentLesson].comp

    return (
        <div className="container">
            <div className="row">
                <SpecificLesson {...props} />
            </div>
        </div>
    )

}

export default AppView
