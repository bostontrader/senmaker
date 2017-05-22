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
    const s:Object = props.strings.get('strings').np

    const quizInsertNPMark:Object | string = q.getIn(['np','insertNP']) ?
        <img id='quizInsertNPMark' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizUpdateNPNounMark:Object | string = q.getIn(['np','updateNPNound']) ?
        <img id='quizUpdateNPNounMark' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizUpdateNPDefinitenessMark:Object | string = q.getIn(['np','updateNPDefiniteness']) ?
        <img id='quizUpdateNPDefinitenessMark' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizDeleteNPMark:Object | string = q.getIn(['np','deleteNP']) ?
        <img id='quizDeleteNPMark' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizBox:Object | null = // q.getIn(['np','passed']) ? null :
        <div id='quiz' style={style}>
            <h3>{props.strings.quiz}</h3>
            <table>
                <tbody>
                <tr>
                    <td><p>{s.quiz1}</p></td>
                    <td>{quizInsertNPMark}</td>
                </tr>
                <tr>
                    <td><p>{s.quiz2}</p></td>
                    <td>{quizUpdateNPNounMark}</td>
                </tr>
                <tr>
                    <td><p>{s.quiz3}</p></td>
                    <td>{quizUpdateNPDefinitenessMark}</td>
                </tr>
                <tr>
                    <td><p>{s.quiz4}</p></td>
                    <td>{quizDeleteNPMark}</td>
                </tr>
                </tbody>
            </table>
        </div>

    return (
        <div>
            <LessonNavigator {...props} />
            <div id='help' style={style}>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
            </div>

            <NPPanel npPanelLevel={NPPanelLevel.L2} {...props} />
            {quizBox}
        </div>
    )

}

export default NounPhrases
