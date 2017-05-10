// @flow
import React from 'react'

import LessonNavigator from './LessonNavigator'
import VPPanel         from '../vp/VPPanel'
import {VPPanelLevel}  from '../../data/vp/VPConstants'

function VPAspect(props:Object):Object {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const q = props.quiz
    const s = props.strings.vp

    const quizInsertVP = q.getIn(['vp','insertVP']) ?
        <img id="insertVPCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizUpdateVP = q.getIn(['vp','updateVP']) ?
        <img id="updateVPCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizDeleteVP = q.getIn(['vp','deleteVP']) ?
        <img id="deleteVPCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''
    
    return (
        <div>
            <div className="help" style={style}>
                <h1>Verb Phrases with Aspect</h1>
            </div>

            <VPPanel vpPanelLevel={VPPanelLevel.L2} {...props} />

            <div className="quiz" style={style}>
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
            <LessonNavigator {...props} />
        </div>
    )

}

export default VPAspect
