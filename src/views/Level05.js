import React from 'react'

import LevelControl from './LevelControl'
import VerbdPanel from './dictionary/verbd/VerbdPanel'

function Level05(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings.Level05

    return(
        <div>
            <div className="help" style={style}>
                <h1>Phrases</h1>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
            </div>
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <p>
                    <input onChange={props.onQuizToggle} type="checkbox" checked={props.level.get('quiz')} />
                    {props.strings.i_understand}
                </p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level05
