// @flow
import React from 'react'

import LessonNavigator   from './LessonNavigator'
import VerbdPanel        from '../dictionary/verbd/VerbdPanel'
import {VerbdPanelLevel} from '../../data/dictionary/verbd/VerbdConstants'

function Verbd(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.verbd

    const quizInsertVerbFlag:string | Object = q.getIn(['verbd','insertVerbd']) ?
        <img id='insertVerbdCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizUpdateVerbFlag:string | Object = q.getIn(['verbd','updateVerbd']) ?
        <img id='updateVerbdCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizDeleteVerbFlag:string | Object = q.getIn(['verbd','deleteVerbd']) ?
        <img id='deleteVerbdCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizBox:Object | null = q.getIn(['verbd','passed']) ? null :
        <div id='quiz' style={style}>
            <h3>{props.strings.quiz}</h3>
            <table>
                <tbody>
                <tr>
                    <td><p>{s.quiz1}</p></td>
                    <td>{quizInsertVerbFlag}</td>
                </tr>
                <tr>
                    <td><p>{s.quiz3}</p></td>
                    <td>{quizUpdateVerbFlag}</td>
                </tr>
                <tr>
                    <td><p>{s.quiz2}</p></td>
                    <td>{quizDeleteVerbFlag}</td>
                </tr>
                </tbody>
            </table>
        </div>

    return(
        <div>
            <LessonNavigator {...props} />
            <div id='help' style={style}>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
            </div>
            <VerbdPanel verbdPanelLevel={VerbdPanelLevel.BASE} {...props} />
            {quizBox}
        </div>
    )
}

export default Verbd
