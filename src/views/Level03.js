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
            <div className="help" style={style}>
                <h1>Nouns</h1>
                <p>When we write nouns must know how many of something we are writing about.  For example are we writing about one cat or more than one cat?</p>
                <p>If we are writing about only one of something, then we use the base form of the noun.</p>
                <p>If we are writing about more than one, then we use the plural form of the noun.</p>
            </div>
            <NounPanel {...props} />
            <div className="quiz" style={style}>
                <h3>Quiz</h3>
                <p>Can you .... ?</p>
                <p>
                    <input onChange={props.onQuizToggle} type="checkbox" checked={props.level.get('quiz')} />
                    I understand
                </p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level03
