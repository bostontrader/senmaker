import React from 'react'

import LessonNavigator from './LessonNavigator'
import VerbdPanel from '../dictionary/verbd/VerbdPanel'

function Verbd(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const q = props.quiz
    const s = props.strings.verbd

    const quizInsertVerbFlag = q.getIn(['verbd','insertVerbd']) ?
        <img id="insertVerbdCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizUpdateVerbFlag = q.getIn(['verbd','updateVerbd']) ?
        <img id="updateVerbdCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizDeleteVerbFlag = q.getIn(['verbd','deleteVerbd']) ?
        <img id="deleteVerbdCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    return(
        <div>
            <div className="help" style={style}>
                <h1>{props.strings.verbs}</h1>
                <p>{s.help10}</p>
            </div>
            <VerbdPanel {...props} />
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><p>{s.quiz1}</p></td>
                            <td>{quizInsertVerbFlag}</td>
                        </tr>
                        <tr>
                            <td><p>{s.quiz3}</p></td>
                            <td>{quizUpdateVerbFlag}</td>
                        </tr>
                        <tr>
                            <td><p>{s.quiz2}</p></td>
                            <td>{quizDeleteVerbFlag}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <LessonNavigator {...props} />
        </div>
    )
}

export default Verbd
