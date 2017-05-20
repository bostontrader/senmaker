// @flow
import React from 'react'

import LessonNavigator   from './LessonNavigator'
import NoundPanel        from '../dictionary/nound/NoundPanel'
import {NoundPanelLevel} from '../../data/dictionary/nound/NoundConstants'

function Nound(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.nound

    const quizInsertNounFlag:string | Object = q.getIn(['nound','insertNound']) ?
        <img id='insertNoundCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizUpdateNounFlag:string | Object = q.getIn(['nound','updateNound']) ?
        <img id='updateNoundCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizDeleteNounFlag:string | Object = q.getIn(['nound','deleteNound']) ?
        <img id='deleteNoundCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizBox:Object | null = q.getIn(['nound','passed']) ? null :
        <div id='quiz' style={style}>
            <h3>{props.strings.quiz}</h3>
            <table>
                <tbody>
                <tr>
                    <td><p>{s.quiz1}</p></td>
                    <td>{quizInsertNounFlag}</td>
                </tr>
                <tr>
                    <td><p>{s.quiz3}</p></td>
                    <td>{quizUpdateNounFlag}</td>
                </tr>
                <tr>
                    <td><p>{s.quiz2}</p></td>
                    <td>{quizDeleteNounFlag}</td>
                </tr>
                </tbody>
            </table>
        </div>


    return(
        <div>
            <LessonNavigator cheat={true} {...props} />
            <div id='help' style={style}>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
            </div>
            <NoundPanel noundPanelLevel={NoundPanelLevel.BASE} {...props} />
            {quizBox}
        </div>
    )
}

export default Nound
