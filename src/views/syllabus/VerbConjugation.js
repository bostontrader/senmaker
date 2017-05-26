// @flow
import React from 'react'

import LessonNavigator from './LessonNavigator'
import QuizActions     from '../../data/quiz/QuizActions'

function VerbConjugation(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.get('strings').verbConjugation
    const sm:Object = props.strings.get('strings').misc

    const iunderstandCheck:Object | string = q.getIn(['verbConjugation','iunderstand']) ?
        <img id='iunderstandCheckmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    return(
        <div>
            <LessonNavigator {...props} />
            <div id='help' style={style}>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
                <p>{s.help14}</p>
                <p>{s.help15}</p>
                <p>{s.help16}</p>
            </div>
            <div id='quiz' style={style}>
                <h3>{sm.quiz}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><p><input id='iunderstandCheck' onChange={QuizActions.verbConjugation.onIUnderstand} type='checkbox' checked={q.getIn(['verbConjugation','iunderstand'])} />
                            {sm.i_understand}</p></td>
                        <td>{iunderstandCheck}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default VerbConjugation
