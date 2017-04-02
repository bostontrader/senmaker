import React from 'react'

import LessonNavigator from './LessonNavigator'
import NoundPanel from '../dictionary/nound/NoundPanel'

function Nound(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const q = props.quiz
    const s = props.strings.nound

    const quizInsertNounFlag = q.getIn(['nound','insertNound']) ?
        <img id="insertNoundCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizUpdateNounFlag = q.getIn(['nound','updateNound']) ?
        <img id="updateNoundCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizDeleteNounFlag = q.getIn(['nound','deleteNound']) ?
        <img id="deleteNoundCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    return(
        <div>
            <div className="help" style={style}>
                <h1>{props.strings.nouns}</h1>
                <p>{s.help10}</p>
            </div>
            <NoundPanel {...props} />
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><p>{s.quiz1}</p></td>
                            <td>{quizInsertNounFlag}</td>
                        </tr>
                        <tr>
                            <td><p>{s.quiz3}</p></td>
                            <td>{quizUpdateNounFlag}</td>
                        </tr>
                        <tr>
                            <td><p>{s.quiz2}</p></td>
                            <td>{quizDeleteNounFlag}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <LessonNavigator {...props} />
        </div>
    )
}

export default Nound
