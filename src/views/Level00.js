import React from 'react'

import LevelControl from './LevelControl'

function Level00(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings.Level00
    const presentQuizState = props.level.getIn(['quizResults',0])
        //<input id="iUnderstand" onChange={props.onSetQuizScore(!presentQuizState)} type="checkbox" checked={presentQuizState} />
    const onChange = () => props.onSetQuizScore(!presentQuizState)

    return (
        <div>
            <div className="help" style={style}>
                <p>{s.help1}</p>
                <p>{s.help2}</p>
                <p>{s.help3}</p>
                <p>{s.help4}</p>
                <p>{s.help5}</p>
            </div>
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <p>
                    <input id="iUnderstand" onChange={onChange} type="checkbox" checked={presentQuizState} />
                    {props.strings.i_understand}
                </p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level00
