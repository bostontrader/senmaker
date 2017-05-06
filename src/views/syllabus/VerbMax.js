// @flow
import React from 'react'

import LessonNavigator   from './LessonNavigator'
import VerbdPanel        from '../dictionary/verbd/VerbdPanel'
import {VerbdPanelLevel} from '../../data/dictionary/verbd/VerbdConstants'

function PastTense(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    //const s:Object = props.strings.pastTense

    return(
        <div>
            <div className="help" style={style}>
                <h1>Verb Max</h1>
            </div>
            <VerbdPanel verbdPanelLevel={VerbdPanelLevel.MAX} {...props} />
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>

                    </tbody>
                </table>
            </div>
            <LessonNavigator {...props} />
        </div>
    )
}

export default PastTense
