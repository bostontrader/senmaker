// @flow
import React from 'react'

import LessonNavigator from './LessonNavigator'
import QuizActions from '../../data/quiz/QuizActions'


function Sentence(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.sentence

    const iunderstandCheck = q.getIn(['sentence','iunderstand']) ?
        <img id="iunderstandCheck" src="/img/Checked.png" alt="checkmark"/> : ''

    return(
        <div>
            <div className="help" style={style}>
                <h1>Sentences</h1>
                <p>{s.help10}</p>
            </div>
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><p><input id="iunderstandCheck" onChange={QuizActions.sentence.onIUnderstand} type="checkbox" checked={q.getIn(['sentence','iunderstand'])} />
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

export default Sentence
