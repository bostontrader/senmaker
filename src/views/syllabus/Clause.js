// @flow
import React from 'react'

import LessonNavigator from './LessonNavigator'
import ClausePanel     from '../clause/ClausePanel'
import QuizActions     from '../../data/quiz/QuizActions'

function Clause(props:Object):Object {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.get('strings').clause
    const sm:Object = props.strings.get('strings').misc

    const iunderstandCheckmark:Object | string = q.getIn(['clause','iunderstand']) ?
        <img id='iunderstandCheckmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    return(
        <div>
            <LessonNavigator {...props} />
            <div id='help' style={style}>
                <p>{s.help10}</p>
            </div>

            <ClausePanel {...props} />

            <div id='quiz' style={style}>
                <h3>{sm.quiz}</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><p><input id='iunderstandCheckbox' onChange={QuizActions.clause.onIUnderstand} type='checkbox' checked={q.getIn(['clause','iunderstand'])} />
                                {sm.i_understand}</p></td>
                            <td>{iunderstandCheckmark}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Clause
