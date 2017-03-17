import React from 'react'

import LevelControl from './LevelControl'
import NounPanel from './nouns/NounPanel'

function Level01(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings.Level01

    const quizInsertNounFlag = props.level.getIn(['quizQuestions','insertNoun']) ?
        <img className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizUpdateNounFlag = props.level.getIn(['quizQuestions','updateNoun']) ?
        <img className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizDeleteNounFlag = props.level.getIn(['quizQuestions','deleteNoun']) ?
        <img className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    return(
        <div>
            <div className="help" style={style}>
                <h1>{props.strings.nouns}</h1>
                <p>{s.help10}</p>
            </div>
            <NounPanel {...props} />
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><p>{s.quiz1}</p></td>
                            <td>{quizInsertNounFlag}</td>
                        </tr>
                        <tr>
                            <td><p>{s.quiz2}</p></td>
                            <td>{quizDeleteNounFlag}</td>
                        </tr>
                        <tr>
                            <td><p>{s.quiz3}</p></td>
                            <td>{quizUpdateNounFlag}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level01
