import React from 'react'

import LevelControl from './LevelControl'
import VerbdPanel from './dictionary/verbd/VerbdPanel'

function Level02(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings.Level02

    const quizInsertVerbFlag = props.level.getIn(['quizQuestions','insertVerbd']) ?
        <img id="insertVerbdCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizUpdateVerbFlag = props.level.getIn(['quizQuestions','updateVerbd']) ?
        <img id="updateVerbdCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizDeleteVerbFlag = props.level.getIn(['quizQuestions','deleteVerbd']) ?
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
                            <td><p>{s.quiz2}</p></td>
                            <td>{quizDeleteVerbFlag}</td>
                        </tr>
                        <tr>
                            <td><p>{s.quiz3}</p></td>
                            <td>{quizUpdateVerbFlag}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level02
