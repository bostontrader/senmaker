// @flow
import React from 'react'

import LessonNavigator          from './LessonNavigator'
import DeterminerdPanel        from '../dictionary/determinerd/DeterminerdPanel'

function Determinerd(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.get('strings').determinerd
    const sm:Object = props.strings.get('strings').misc

    const quizInsertDeterminerCheckmark:string | Object = q.getIn(['determinerd','insertDeterminerd']) ?
        <img id='insertDeterminerdCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizUpdateDeterminerCheckmark:string | Object = q.getIn(['determinerd','updateDeterminerd']) ?
        <img id='updateDeterminerdCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizDeleteDeterminerCheckmark:string | Object = q.getIn(['determinerd','deleteDeterminerd']) ?
        <img id='deleteDeterminerdCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizBox:Object | null = // q.getIn(['determinerd','passed']) ? null :
        <div id='quiz' style={style}>
            <h3>{sm.quiz}</h3>
            <table>
                <tbody>
                    <tr>
                        <td><p>{s.quiz1}</p></td>
                        <td>{quizInsertDeterminerCheckmark}</td>
                    </tr>
                    <tr>
                        <td><p>{s.quiz3}</p></td>
                        <td>{quizUpdateDeterminerCheckmark}</td>
                    </tr>
                    <tr>
                        <td><p>{s.quiz2}</p></td>
                        <td>{quizDeleteDeterminerCheckmark}</td>
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
            <DeterminerdPanel {...props} />
            {quizBox}
        </div>
    )
}

export default Determinerd
