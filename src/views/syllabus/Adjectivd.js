import React from 'react'

import LessonNavigator from './LessonNavigator'
import AdjectivdPanel from '../dictionary/adjectivd/AdjectivdPanel'

function Adjectivd(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const q = props.quiz
    const s = props.strings.adjectivd

    const quizInsertAdjectivFlag = q.getIn(['adjectivd','insertAdjectivd']) ?
        <img id="insertAdjectivdCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizUpdateAdjectivFlag = q.getIn(['adjectivd','updateAdjectivd']) ?
        <img id="updateAdjectivdCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    const quizDeleteAdjectivFlag = q.getIn(['adjectivd','deleteAdjectivd']) ?
        <img id="deleteAdjectivdCheck" className="checkmark" src="/img/Checked.png" alt="checkmark"/> : ''

    return(
        <div>
            <div className="help" style={style}>
                <h1>{props.strings.adjectivs}</h1>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
            </div>
            <AdjectivdPanel {...props} />
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><p>{s.quiz1}</p></td>
                            <td>{quizInsertAdjectivFlag}</td>
                        </tr>
                        <tr>
                            <td><p>{s.quiz3}</p></td>
                            <td>{quizUpdateAdjectivFlag}</td>
                        </tr>
                        <tr>
                            <td><p>{s.quiz2}</p></td>
                            <td>{quizDeleteAdjectivFlag}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <LessonNavigator {...props} />
        </div>
    )
}

export default Adjectivd