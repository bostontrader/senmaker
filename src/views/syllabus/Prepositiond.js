import React from 'react'

import LessonNavigator from './LessonNavigator'
import PrepositiondPanel  from '../dictionary/prepositiond/PrepositiondPanel'

function Prepositiond(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const q = props.quiz
    const s:Object = props.strings.get('strings').prepositiond
    const sm:Object = props.strings.get('strings').misc

    const quizInsertAdjectivFlag = q.getIn(['prepositiond','insertPrepositiond']) ?
        <img id='insertPrepositiondCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizUpdateAdjectivFlag = q.getIn(['prepositiond','updatePrepositiond']) ?
        <img id='updatePrepositiondCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizDeleteAdjectivFlag = q.getIn(['prepositiond','deletePrepositiond']) ?
        <img id='deletePrepositiondCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    return(
        <div>
            <LessonNavigator {...props} />
            <div id='help' style={style}>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
            </div>
            <PrepositiondPanel {...props} />
            <div id='quiz' style={style}>
                <h3>{sm.quiz}</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><p>{s.quiz1}</p></td>
                            <td>{quizInsertAdjectivFlag}</td>
                        </tr>
                        <tr>
                            <td><p>{s.quiz3}</p></td>
                            <td>{quizUpdateAdjectivFlag}</td>
                        </tr>
                        <tr>
                            <td><p>{s.quiz2}</p></td>
                            <td>{quizDeleteAdjectivFlag}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Prepositiond
