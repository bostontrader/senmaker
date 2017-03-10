import React from 'react'

import LevelControl from './LevelControl'
import NounPanel from './nouns/NounPanel'

function Level01(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings.Level01

    return(
        <div>
            <div className="help" style={style}>
                <h1>{props.strings.nouns}</h1>
                <p>{s.help10}</p>
            </div>
            <NounPanel {...props} />
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <p>{s.quiz1}</p>
                <p>{s.quiz2}</p>
                <p>{s.quiz3}</p>
                <p>
                    <input onChange={props.onQuizToggle} type="checkbox" checked={props.level.get('quiz')} />
                    {props.strings.i_understand}
                </p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level01
