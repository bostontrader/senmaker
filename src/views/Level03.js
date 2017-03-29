import React from 'react'

import AppActions from '../data/AppActions'
import LevelControl from './LevelControl'
import NouniAddForm from './nouni/addedit/NouniAddForm'

function Level03(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings.Level03

    const quizOnNoundChangedFlag = props.level.getIn(['quizQuestions','noundChanged']) ?
        <img id="xxxupdateVerbdCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizOnDefinitenessChangedFlag = props.level.getIn(['quizQuestions','definitenessChanged']) ?
        <img id="changeDefinitenessCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizIseeArticleChangedFlag = props.level.getIn(['quizQuestions','iseeArticleChanged']) ?
        <img id="xxx" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    return(
        <div>
            <div className="help" style={style}>
                <h1>Definite or Indefinite</h1>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
                <p>{s.help14}</p>
                <p>{s.help15}</p>
            </div>

            <NouniAddForm {...props} />

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
                        <td><p>{s.quiz3}</p></td>
                        <td>{quizIseeArticleChangedFlag}</td>
                    </tr>
                    </tbody>
                </table>
                <p>
                    <input onChange={props.onQuizToggle} type="checkbox" checked={props.level.get('quiz')} />
                    {props.strings.i_understand}
                </p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level03
