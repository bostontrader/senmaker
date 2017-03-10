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
            <div className="help" style={style}>
                <h1>Verbs</h1>
                <p>We start with a 'base' form of the verb and then we make changes to it according to the rules of grammar.</p>
                <p>For example: If we performed the verb in the past we use the 'past tense' form of them verb.</p>
                <p>The base form of the verb is changed into the past-tense form according to certain rules.</p>
            </div>
            <VerbPanel {...props} />
            <div className="quiz" style={style}>
                <h3>{props.strings.quiz}</h3>
                <p>Can you .... ?</p>
                <p>
                    <input onChange={props.onQuizToggle} type="checkbox" checked={props.level.get('quiz')} />
                    {props.strings.i_understand}
                </p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level04
