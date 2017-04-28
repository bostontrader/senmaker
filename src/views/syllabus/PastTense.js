import React from 'react'

import LessonNavigator from './LessonNavigator'
import VerbdPanel from '../dictionary/verbd/VerbdPanel'

function PastTense(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const q = props.quiz
    const s = props.strings.pastTense

    /*const quizInsertVerbFlag = q.getIn(['verbd','insertPastTense']) ?
        <img id="insertPastTenseCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizUpdateVerbFlag = q.getIn(['verbd','updatePastTense']) ?
        <img id="updatePastTenseCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizDeleteVerbFlag = q.getIn(['verbd','deletePastTense']) ?
        <img id="deletePastTenseCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''*/

    return(
        <div>
            <div className="help" style={style}>
                <h1>Past Tense</h1>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
            </div>
            <VerbdPanel verbdPanelLevel='catfood' {...props} />
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
