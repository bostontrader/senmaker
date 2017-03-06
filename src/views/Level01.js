import React from 'react'

import LevelControl from './LevelControl'
import NounPanel from './nouns/NounPanel'

function Level01(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    return(
        <div>
            <NounPanel {...props} />
            <div className="quiz" style={style}>
                <h3>Quiz</h3>
                <p>Can you add a new noun?</p>
                <p>Can you delete a noun from this list?</p>
                <p>Can you change the spelling of a noun?</p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level01
