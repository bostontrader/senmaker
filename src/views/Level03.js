import React from 'react'

import LevelControl from './LevelControl'
import NounPanel from './nouns/NounPanel'

function Level03(props) {

    return(
        <div className="container">
            <LevelControl {...props} />
            <NounPanel {...props} />
            <div className="row">
                <p>Can you .... ?</p>
            </div>
        </div>
    )
}

export default Level03
