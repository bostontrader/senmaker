// @flow
import React from 'react'

import LessonNavigator from './LessonNavigator'
import ClausePanel     from '../clause/ClausePanel'
import QuizActions     from '../../data/quiz/QuizActions'

function Phrases(props:Object):Object {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const q = props.quiz
    const s = props.strings.clause

    const iunderstandCheck = q.getIn(['phrases','iunderstand']) ?
        <img id="iunderstandCheck" src="/img/Checked.png" alt="checkmark"/> : ''

    return(
        <div>
            <div className="help" style={style}>
                <h1>Clauses</h1>
                <p>{s.help10}</p>
            </div>

            <ClausePanel {...props} />

            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                    <tr>

                    </tr>
                    </tbody>
                </table>
            </div>
            <LessonNavigator {...props} />
        </div>
    )
}

export default Phrases
