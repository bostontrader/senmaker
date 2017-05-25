// @flow
import React from 'react'

import LessonNavigator from './LessonNavigator'
import VPPanel         from '../vp/VPPanel'
import {VPPanelLevel}  from '../../data/vp/VPConstants'

function VerbPhrase(props:Object):Object {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.get('strings').vp
    const sm:Object = props.strings.get('strings').misc

    const quizInsertVPMark:Object | string = q.getIn(['vp','insertVP']) ?
        <img id='quizInsertVPMark' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizUpdateVPVerbMark:Object | string = q.getIn(['vp','changeVPVerbd']) ?
        <img id='quizUpdateVPVerbMark' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizUpdateVPDefinitenessMark:Object | string = q.getIn(['vp','changeVerbTime']) ?
        <img id='quizUpdateVPDefinitenessMark' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizDeleteVPMark:Object | string = q.getIn(['vp','deleteVP']) ?
        <img id='quizDeleteVPMark' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''


    const quizBox:Object | null = // q.getIn(['vp','passed']) ? null :
        <div id='quiz' style={style}>
            <h3>{sm.quiz}</h3>
            <table>
                <tbody>
                <tr>
                    <td><p>{s.quiz1}</p></td>
                    <td>{quizInsertVPMark}</td>
                </tr>
                <tr>
                    <td><p>{s.quiz2}</p></td>
                    <td>{quizUpdateVPVerbMark}</td>
                </tr>
                <tr>
                    <td><p>{s.quiz3}</p></td>
                    <td>{quizUpdateVPDefinitenessMark}</td>
                </tr>
                <tr>
                    <td><p>{s.quiz4}</p></td>
                    <td>{quizDeleteVPMark}</td>
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
            </div>

            <VPPanel vpPanelLevel={VPPanelLevel.L1} {...props} />
            {quizBox}
        </div>
    )

}

export default VerbPhrase
