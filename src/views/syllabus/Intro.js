// @flow
import React from 'react'

import LessonNavigator from '../syllabus/LessonNavigator'
import QuizActions     from '../../data/quiz/QuizActions'

function Intro(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.intro

    const iunderstandCheckmark:Object | string = q.getIn(['intro','iunderstand']) ?
        <img id="iunderstandCheckmark" src="/img/Checked.png" alt="checkmark" width="36" height="36"/> : ''

    const quizBox:Object | null = q.getIn(['intro','passed']) ? null :
        <div id="quiz" style={style}>
            <h3>{props.strings.quiz}</h3>
            <p>{props.strings.intro.quiz10}</p>
            <table>
                <tbody>
                <tr>
                    <td><p><input id="iunderstandCheckbox" onChange={QuizActions.intro.onIUnderstand} type="checkbox" checked={q.getIn(['intro','iunderstand'])} />
                        {props.strings.i_understand}</p></td>
                    <td>{iunderstandCheckmark}</td>
                </tr>
                </tbody>
            </table>
        </div>

    return (
        <div>
            <LessonNavigator cheat={false} {...props} />
            <div id="help" style={style}>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
            </div>
            {quizBox}
        </div>
    )
}

export default Intro
