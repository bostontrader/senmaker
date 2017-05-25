// @flow
import React from 'react'

import LessonNavigator from './LessonNavigator'
import NPPanel         from '../np/NPPanel'
import {NPPanelLevel}  from '../../data/np/NPConstants'
import QuizActions     from '../../data/quiz/QuizActions'

function NPAdjectives(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.get('strings').npAdjective
    const sm:Object = props.strings.get('strings').misc

    const iunderstandCheckmark:Object | string = q.getIn(['npAdjective','iunderstand']) ?
        <img id='iunderstandCheckmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    return (
        <div>
            <LessonNavigator {...props} />
            <div id='help' style={style}>
                <p>{s.help10}</p>
            </div>

            <NPPanel npPanelLevel={NPPanelLevel.ADJECTIVES} {...props} />

            <div id='quiz' style={style}>
                <h3>{sm.quiz}</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><p><input id='iunderstandCheckbox' onChange={QuizActions.npAdjective.onIUnderstand} type='checkbox' checked={q.getIn(['npAdjective','iunderstand'])} />
                                {sm.i_understand}</p></td>
                            <td>{iunderstandCheckmark}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default NPAdjectives
