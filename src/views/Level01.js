import React from 'react'

import NounPanel from './nouns/NounPanel'

function Level01(props) {

    return(
        <div className="container">
            <NounPanel {...props} />
            <div className="row">
                <p>Can you add a new noun?</p>
                <p>Can you delete a noun from this list?</p>
                <p>Can you change the spelling of a noun?</p>
            </div>
        </div>
    )
}

export default Level01
