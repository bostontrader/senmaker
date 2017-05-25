// @flow
import React from 'react'

import LessonNavigator   from './LessonNavigator'
import VerbdPanel        from '../dictionary/verbd/VerbdPanel'
import {VerbdPanelLevel} from '../../data/dictionary/verbd/VerbdConstants'
import QuizActions       from '../../data/quiz/QuizActions'

function PastForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.get('strings').pastForm
    const sm:Object = props.strings.get('strings').misc

    const iunderstandCheckmark:Object | string = q.getIn(['pastForm','iunderstand']) ?
        <img id='iunderstandCheckmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''
    
    return(
        <div>
            <LessonNavigator {...props} />
            <div id='help' style={style}>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
            </div>
            <VerbdPanel verbdPanelLevel={VerbdPanelLevel.PAST_FORM} {...props} />
            <div id='quiz' style={style}>
                <h3>{sm.quiz}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><p><input id='iunderstandCheckbox' onChange={QuizActions.pastForm.onIUnderstand} type='checkbox' checked={q.getIn(['pastForm','iunderstand'])} />
                            {sm.i_understand}</p></td>
                        <td>{iunderstandCheckmark}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PastForm
