// @flow
import React    from 'react'

import syllabus from '../data/Syllabus'

function AppView(props:Object):Object {

    const currentLesson = props.app.getIn(['level', 'currentLesson'])
    const SpecificLesson:Object = syllabus[currentLesson].comp

    return (
        <div className="container">
            <div className="row">
                <SpecificLesson {...props} />
            </div>
        </div>
    )

}

export default AppView
