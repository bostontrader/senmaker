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

    const quizInsertVP = q.getIn(['vp','insertVP']) ?
        <img id='insertVPCheck' className='checkmark' src='/img/Checked.png' alt='checkmark'/> : ''

    const quizUpdateVP = q.getIn(['vp','updateVP']) ?
        <img id='updateVPCheck' className='checkmark' src='/img/Checked.png' alt='checkmark'/> : ''

    const quizDeleteVP = q.getIn(['vp','deleteVP']) ?
        <img id='deleteVPCheck' className='checkmark' src='/img/Checked.png' alt='checkmark'/> : ''
    
    return (
        <div>
            <LessonNavigator {...props} />
            <div id='help' style={style}>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
            </div>

            <VPPanel vpPanelLevel={VPPanelLevel.L1} {...props} />

            <div id='quiz' style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><p>{s.quiz1}</p></td>
                        <td>{quizInsertVP}</td>
                    </tr>
                    <tr>
                        <td><p>{s.quiz3}</p></td>
                        <td>{quizUpdateVP}</td>
                    </tr>
                    <tr>
                        <td><p>{s.quiz2}</p></td>
                        <td>{quizDeleteVP}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default VerbPhrase
