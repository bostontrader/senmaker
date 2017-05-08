// @flow
import React from 'react'

import LessonNavigator   from './LessonNavigator'
import {VerbdPanelLevel} from '../../data/dictionary/verbd/VerbdConstants'

function Tense(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.tense

    /*const quizInsertVerbFlag = q.getIn(['verbd','insertTense']) ?
        <img id="insertTenseCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizUpdateVerbFlag = q.getIn(['verbd','updateTense']) ?
        <img id="updateTenseCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizDeleteVerbFlag = q.getIn(['verbd','deleteTense']) ?
        <img id="deleteTenseCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''*/

    return(
        <div>
            <div className="help" style={style}>
                <h1>Tense</h1>
                {s.map(h => (<p>{h}</p>))}

            </div>
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

export default Tense
