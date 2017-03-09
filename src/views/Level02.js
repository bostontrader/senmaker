import React from 'react'

import LevelControl from './LevelControl'
import VerbPanel from './verbs/VerbPanel'

function Level02(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    return(
        <div>
            <VerbPanel {...props} />
            <div className="quiz" style={style}>
                <h3>Quiz</h3>
                <p>Can you add a new verb?</p>
                <p>Can you delete a verb from this list?</p>
                <p>Can you change the spelling of a verb?</p>
                <p>
                    <input onChange={props.onQuizToggle} type="checkbox" checked={props.level.get('quiz')} />
                    I understand
                </p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level02
