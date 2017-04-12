import React from 'react'

import LessonNavigator from './LessonNavigator'
import NouniPanel from '../nouni/NouniPanel'
import QuizActions from '../../data/quiz/QuizActions'

function Nouni(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const q = props.quiz
    const s = props.strings.nouni

    /*const quizInsertNounFlag = q.getIn(['nouni','insertNouni']) ?
        <img id="insertNouniCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizUpdateNounFlag = q.getIn(['nouni','updateNouni']) ?
        <img id="updateNouniCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizDeleteNounFlag = q.getIn(['nouni','deleteNouni']) ?
        <img id="deleteNouniCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''*/

    const iunderstandCheck = q.getIn(['nouni','iunderstand']) ?
        <img id="iunderstandCheck" src="/img/Checked.png" alt="checkmark"/> : ''

    return(
        <div>
            <div className="help" style={style}>
                <h1>Instantiated Nouns</h1>
                <p>A dictionary only has one entry for each noun.</p>
                <p>But a sentence may have more than one instance of a particular noun.</p>
                <p>The grammar of each noun may also be different.</p>
                <p>So therefore we must maintain a collection of 'instantiated nouns'.</p>
            </div>
            <NouniPanel {...props} />
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><p><input id="iunderstandCheck" onChange={QuizActions.nouni.onIUnderstand} type="checkbox" checked={q.getIn(['nouni','iunderstand'])} />
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

export default Nouni
