import React from 'react'

import LevelControl from './LevelControl'

function Level00(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    return (
        <div>
            <div className="help" style={style}>
                <p>This program will help you build an English composition.</p>
                <p>In order to do that you must first learn how to build smaller pieces of English.</p>
                <p>You can then assemble the small pieces of English into larger components.</p>
                <p>You will learn how to do this by following these lessons.</p>
                <p>You are presently on Level 0. In order to proceed to the next level you will need to pass the quiz.</p>
            </div>
            <div className="quiz" style={style}>
                <h3>Quiz</h3>
                <input onChange={props.onQuiz0Toggle} type="checkbox" checked={props.level.quiz} />
                <p>I understand</p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level00
