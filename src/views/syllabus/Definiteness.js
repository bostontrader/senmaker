// @flow
import React from 'react'

import AppActions  from '../../data/app/AppActions'
import QuizActions from '../../data/quiz/QuizActions'

import LessonNavigator from './LessonNavigator'
import NPAEForm        from '../np/addedit/NPAEForm'
import {NPPanelLevel}  from '../../data/np/NPConstants'

function Definiteness(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.definiteness

    const quizOnNoundChangedFlag:Object | string = q.getIn(['definiteness','noundChanged']) ?
        <img id='changeNoundCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizOnDefinitenessChangedFlag:Object | string = q.getIn(['definiteness','definitenessChanged']) ?
        <img id='changeDefinitenessCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizIseeArticleChangedFlag:Object | string = q.getIn(['definiteness','iseeArticleChanged']) ?
        <img id='iseeArticleChangedCheck' className='checkmark' src='/img/Checked.png' alt='checkmark' width='36' height='36'/> : ''

    const quizBox:Object | null = // q.getIn(['definiteness','passed']) ? null :
        <div id='quiz' style={style}>
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
                            <input  id='iseeArticleChanged' onChange={QuizActions.definiteness.onIseeArticleChanged} type='checkbox' checked={q.getIn(['definiteness','iseeArticleChanged'])} />
                            {s.quiz4}
                        </p>
                    </td>
                    <td>{quizIseeArticleChangedFlag}</td>
                </tr>
                </tbody>
            </table>

        </div>

    return(
        <div>
            <LessonNavigator cheat={true} {...props} />
            <div id='help' style={style}>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
                <p>{s.help14}</p>
                <p>{s.help15}</p>
                <p>{s.help16}</p>
            </div>
            <NPAEForm npPanelLevel={NPPanelLevel.L1} {...props} />
            {quizBox}

        </div>
    )
}

export default Definiteness
