import React from 'react'

import LevelControl from './LevelControl'

function Level00(props) {
    return (
        <div>
            <p>This program will help you build English sentences.</p>
            <LevelControl {...props} />
        </div>
    )
}

export default Level00
