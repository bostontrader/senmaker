import React from 'react'

import LessonNavigator from './LessonNavigator'
import QuizActions from '../../data/quiz/QuizActions'

function NounPhrases(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const q = props.quiz
    const s = props.strings.nounPhrases

    const iunderstandCheck = q.getIn(['nounPhrases','iunderstand']) ?
        <img id="iunderstandCheck" src="/img/Checked.png" alt="checkmark"/> : ''

    return(
        <div>
            <div className="help" style={style}>
                <h1>Noun Phrases</h1>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
            </div>
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><p><input id="iunderstandCheck" onChange={QuizActions.nounPhrases.onIUnderstand} type="checkbox" checked={q.getIn(['nounPhrases','iunderstand'])} />
                            {props.strings.i_understand}</p></td>
                        <td>{iunderstandCheck}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <LessonNavigator {...props} />
        </div>
    )
}

export default NounPhrases
