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
        <img id='iunderstandCheckmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizBox:Object | null = // q.getIn(['phrase','passed']) ? null :
        <div id='quiz' style={style}>
            <h3>{props.strings.quiz}</h3>
            <table>
                <tbody>
                <tr>
                    <td><p><input id='iunderstandCheckbox' onChange={QuizActions.phrase.onIUnderstand} type='checkbox' checked={q.getIn(['phrase','iunderstand'])} />
                        {props.strings.i_understand}</p></td>
                    <td>{iunderstandCheckmark}</td>
                </tr>
                </tbody>
            </table>
        </div>

    return(
        <div>
            <LessonNavigator {...props} />
            <div id='help' style={style}>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
            </div>
            {quizBox}
        </div>
    )
}

export default Phrase
