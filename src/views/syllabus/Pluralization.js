// @flow
import React from 'react'

import LessonNavigator   from './LessonNavigator'
import NoundPanel        from '../dictionary/nound/NoundPanel'
import {NoundPanelLevel} from '../../data/dictionary/nound/NoundConstants'
import QuizActions       from '../../data/quiz/QuizActions'

function Pluralization(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.pluralization

    const iunderstandCheck:Object | string = q.getIn(['pluralization','iunderstand']) ?
        <img id="iunderstandCheck" src="/img/Checked.png" alt="checkmark"/> : ''

    return(
        <div>
            <div className="help" style={style}>
                <h1>Singular or Plural</h1>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
            </div>
            <NoundPanel noundPanelLevel={NoundPanelLevel.PLURALIZATION} {...props} />
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><p><input id="iunderstandCheck" onChange={QuizActions.pluralization.onIUnderstand} type="checkbox" checked={q.getIn(['pluralization','iunderstand'])} />
                            {props.strings.i_understand}</p></td>
                        <td>{iunderstandCheck}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <LessonNavigator {...props} />
        </div>
    )
}

export default Pluralization
