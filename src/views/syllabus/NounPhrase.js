// @flow
import React from 'react'

import LessonNavigator from './LessonNavigator'
import NPPanel         from '../np/NPPanel'
import {NPPanelLevel}  from '../../data/np/NPConstants'

function NounPhrases(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.np

    const quizInsertNP:Object | string = q.getIn(['np','insertNP']) ?
        <img id="insertNPCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizUpdateNP:Object | string = q.getIn(['np','updateNP']) ?
        <img id="updateNPCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizDeleteNP:Object | string = q.getIn(['np','deleteNP']) ?
        <img id="deleteNPCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''
    
    return (
        <div>
            <div className="help" style={style}>
                <h1>Noun Phrases</h1>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
            </div>

            <NPPanel npPanelLevel={NPPanelLevel.L2} {...props} />

            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><p>{s.quiz1}</p></td>
                        <td>{quizInsertNP}</td>
                    </tr>
                    <tr>
                        <td><p>{s.quiz3}</p></td>
                        <td>{quizUpdateNP}</td>
                    </tr>
                    <tr>
                        <td><p>{s.quiz2}</p></td>
                        <td>{quizDeleteNP}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <LessonNavigator {...props} />
        </div>
    )
    /*return(
        <div>
            <div className="help" style={style}>
                <h1>Noun Phrases</h1>


            </div>
            <NPPanel {...props} />
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><p><input id="iunderstandCheck" onChange={QuizActions.nounPhrases.onIUnderstand} type="checkbox" checked={q.getIn(['nounPhrases','iunderstand'])} />
                            {props.strings.i_understand}</p></td>
                        <td>{iunderstandCheck}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <LessonNavigator {...props} />
        </div>
    )*/
}

export default NounPhrases
