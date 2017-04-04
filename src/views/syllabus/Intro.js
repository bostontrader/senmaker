import React from 'react'

import LessonNavigator from '../syllabus/LessonNavigator'
import QuizActions     from '../../data/quiz/QuizActions'

function Intro(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const q = props.quiz
    const s = props.strings.intro
console.log('Intro',props.strings.intro)
    //const onChange = () => q.getIn(['intro','onIUnderstand'])
    const onChange = QuizActions.intro.onIUnderstand

    const iunderstandCheck = q.getIn(['intro','iunderstand']) ?
        <img id="iunderstandCheck" src="/img/Checked.png" alt="checkmark"/> : ''

    return (
        <div>
            <div className="help" style={style}>
                <p>{s.help1}</p>
                <p>{s.help2}</p>
                <p>{s.help3}</p>
                <p>{s.help4}</p>
                <p>{s.help5}</p>
            </div>
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><p><input id="iunderstandCheck" onChange={onChange} type="checkbox" checked={q.getIn(['intro','iunderstand'])} />
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

export default Intro
