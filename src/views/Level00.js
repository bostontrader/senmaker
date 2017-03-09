import React from 'react'

import LevelControl from './LevelControl'

function Level00(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings.level00

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
                    <input onChange={props.onQuizToggle} type="checkbox" checked={props.level.get('quiz')} />
                    I understand 我明白
                </p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level00
