import React from 'react'

import LevelControl from './LevelControl'
import VerbPanel from './verbs/VerbPanel'

function Level04(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    return(
        <div>
            <VerbPanel {...props} />
            <div className="quiz" style={style}>
                <p>Can you .... ?</p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level04
