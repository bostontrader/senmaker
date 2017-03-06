import React from 'react'

import LevelControl from './LevelControl'
import NounPanel from './nouns/NounPanel'

function Level03(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    return(
        <div>
            <NounPanel {...props} />
            <div className="quiz" style={style}>
                <p>Can you .... ?</p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level03
