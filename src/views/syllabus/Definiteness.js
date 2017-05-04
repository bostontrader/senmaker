import React from 'react'

import AppActions  from '../../data/app/AppActions'
import QuizActions from '../../data/quiz/QuizActions'

import LessonNavigator from './LessonNavigator'
import NPAEForm        from '../np/addedit/NPAEForm'
import {NPPanelLevel}  from '../../data/np/NPConstants'

function Definiteness(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const q = props.quiz
    const s = props.strings.definiteness

    const onChange = QuizActions.definiteness.onIseeArticleChanged

    const quizOnNoundChangedFlag = q.getIn(['definiteness','noundChanged']) ?
        <img id="changeNoundCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizOnDefinitenessChangedFlag = q.getIn(['definiteness','definitenessChanged']) ?
        <img id="changeDefinitenessCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizIseeArticleChangedFlag = q.getIn(['definiteness','iseeArticleChanged']) ?
        <img id="iseeArticleChangedCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    return(
        <div>
            <div className="help" style={style}>
                <h1>{s.help10}</h1>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
                <p>{s.help14}</p>
                <p>{s.help15}</p>
            </div>

            <NPAEForm npPanelLevel={NPPanelLevel.L1} {...props} />

            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><p>{s.quiz1}</p></td>
                        <td>{quizOnNoundChangedFlag}</td>
                    </tr>
                    <tr>
                        <td><p>{s.quiz2}</p></td>
                        <td>{quizOnDefinitenessChangedFlag}</td>
                    </tr>
                    <tr>
                        <td>
                            <p>{s.quiz3}</p>
                            <p>
                                <input  id="iseeArticleChanged" onChange={onChange} type="checkbox" checked={q.getIn(['definiteness','iseeArticleChanged'])} />
                                {'I can see it change'}
                            </p>
                        </td>
                        <td>{quizIseeArticleChangedFlag}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
            <LessonNavigator {...props} />
        </div>
    )
}

export default Definiteness
