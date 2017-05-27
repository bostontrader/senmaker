import React from 'react'

import LessonNavigator from './LessonNavigator'
import AdverbdPanel    from '../dictionary/adverbd/AdverbdPanel'

function Adverbd(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const q = props.quiz
    const s:Object = props.strings.get('strings').adverbd
    const sm:Object = props.strings.get('strings').misc

    const quizInsertAdjectivCheckmark = q.getIn(['adverbd','insertAdverbd']) ?
        <img id='insertAdverbdCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizUpdateAdjectivCheckmark = q.getIn(['adverbd','updateAdverbd']) ?
        <img id='updateAdverbdCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizDeleteAdjectivCheckmark = q.getIn(['adverbd','deleteAdverbd']) ?
        <img id='deleteAdverbdCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    return(
        <div>
            <LessonNavigator {...props} />
            <div id='help' style={style}>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
            </div>
            <AdverbdPanel {...props} />
            <div id='quiz' style={style}>
                <h3>{sm.quiz}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><p>{s.quiz1}</p></td>
                        <td>{quizInsertAdjectivCheckmark}</td>
                    </tr>
                    <tr>
                        <td><p>{s.quiz3}</p></td>
                        <td>{quizUpdateAdjectivCheckmark}</td>
                    </tr>
                    <tr>
                        <td><p>{s.quiz2}</p></td>
                        <td>{quizDeleteAdjectivCheckmark}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Adverbd
