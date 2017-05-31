// @flow
import React from 'react'

import LessonNavigator          from './LessonNavigator'
import PronoundPanel        from '../dictionary/pronound/PronoundPanel'

function Pronound(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.get('strings').pronound
    const sm:Object = props.strings.get('strings').misc

    const quizInsertPronounCheckmark:string | Object = q.getIn(['pronound','insertPronound']) ?
        <img id='insertPronoundCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizUpdatePronounCheckmark:string | Object = q.getIn(['pronound','updatePronound']) ?
        <img id='updatePronoundCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizDeletePronounCheckmark:string | Object = q.getIn(['pronound','deletePronound']) ?
        <img id='deletePronoundCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizBox:Object | null = // q.getIn(['pronound','passed']) ? null :
        <div id='quiz' style={style}>
            <h3>{sm.quiz}</h3>
            <table>
                <tbody>
                    <tr>
                        <td><p>{s.quiz1}</p></td>
                        <td>{quizInsertPronounCheckmark}</td>
                    </tr>
                    <tr>
                        <td><p>{s.quiz3}</p></td>
                        <td>{quizUpdatePronounCheckmark}</td>
                    </tr>
                    <tr>
                        <td><p>{s.quiz2}</p></td>
                        <td>{quizDeletePronounCheckmark}</td>
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
            <PronoundPanel {...props} />
            {quizBox}
        </div>
    )
}

export default Pronound
