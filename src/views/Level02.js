import React from 'react'

import LevelControl from './LevelControl'
import VerbPanel from './verbs/VerbPanel'

function Level02(props) {

    return(
        <div className="container">
            <LevelControl {...props} />
            <VerbPanel {...props} />
            <div className="row">
                <p>Can you add a new verb?</p>
                <p>Can you delete a verb from this list?</p>
                <p>Can you change the spelling of a verb?</p>
            </div>
        </div>
    )
}

export default Level02
