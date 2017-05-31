// @flow
import React from 'react'

import LessonNavigator          from './LessonNavigator'
import ConjunctiondPanel        from '../dictionary/conjunctiond/ConjunctiondPanel'

function Conjunctiond(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.get('strings').conjunctiond
    const sm:Object = props.strings.get('strings').misc

    const quizInsertConjunctionCheckmark:string | Object = q.getIn(['conjunctiond','insertConjunctiond']) ?
        <img id='insertConjunctiondCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizUpdateConjunctionCheckmark:string | Object = q.getIn(['conjunctiond','updateConjunctiond']) ?
        <img id='updateConjunctiondCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizDeleteConjunctionCheckmark:string | Object = q.getIn(['conjunctiond','deleteConjunctiond']) ?
        <img id='deleteConjunctiondCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizBox:Object | null = // q.getIn(['conjunctiond','passed']) ? null :
        <div id='quiz' style={style}>
            <h3>{sm.quiz}</h3>
            <table>
                <tbody>
                    <tr>
                        <td><p>{s.quiz1}</p></td>
                        <td>{quizInsertConjunctionCheckmark}</td>
                    </tr>
                    <tr>
                        <td><p>{s.quiz3}</p></td>
                        <td>{quizUpdateConjunctionCheckmark}</td>
                    </tr>
                    <tr>
                        <td><p>{s.quiz2}</p></td>
                        <td>{quizDeleteConjunctionCheckmark}</td>
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
            <ConjunctiondPanel {...props} />
            {quizBox}
        </div>
    )
}

export default Conjunctiond
