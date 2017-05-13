// @flow
import React from 'react'

import LessonNavigator from './LessonNavigator'
import QuizActions     from '../../data/quiz/QuizActions'


function Phrase(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.phrase

    const iunderstandCheckmark:Object | string = q.getIn(['phrase','iunderstand']) ?
        <img id="iunderstandCheckmark" src="/img/Checked.png" alt="checkmark" width="36" height="36"/> : ''

    return(
        <div>
            <LessonNavigator {...props} />
            <div className="help" style={style}>
                <h1>Phrases</h1>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
            </div>
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><p><input id="iunderstandCheckbox" onChange={QuizActions.phrase.onIUnderstand} type="checkbox" checked={q.getIn(['phrase','iunderstand'])} />
                            {props.strings.i_understand}</p></td>
                        <td>{iunderstandCheckmark}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Phrase
