// @flow
import React from 'react'

import LessonNavigator from './LessonNavigator'
import NPPanel         from '../np/NPPanel'
import {NPPanelLevel}  from '../../data/np/NPConstants'

function NPAdjectives(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.npAdjective

    return (
        <div>
            <LessonNavigator {...props} />
            <div className="help" style={style}>
                <p>{s.help10}</p>
            </div>

            <NPPanel npPanelLevel={NPPanelLevel.ADJECTIVES} {...props} />

            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default NPAdjectives
