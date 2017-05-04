// @flow
import React from 'react'

import LessonNavigator from './LessonNavigator'
import NPPanel         from '../np/NPPanel'
import {NPPanelLevel}  from '../../data/np/NPConstants'

function NounPhrases(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.npWithAdjectives

    return (
        <div>
            <div className="help" style={style}>
                <h1>Noun Phrases with Adjectives</h1>
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
            <LessonNavigator {...props} />
        </div>
    )

}

export default NounPhrases
