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
            <div className="help" style={style}>
                <h1>Nouns</h1>
                <p>The things around us are called <strong>nouns</strong>.</p>
            </div>
            <NounPanel {...props} />
            <div className="quiz" style={style}>
                <h3>Quiz测试</h3>
                <p>Can you add a new noun?你可以添加一个新的名词吗?</p>
                <p>Can you delete a noun from this list?你可以从这个列表中删除一个名词吗?</p>
                <p>Can you change the spelling of a noun?你能改变一个名词的拼写吗?
                </p>
                <p>
                    <input onChange={props.onQuizToggle} type="checkbox" checked={props.level.get('quiz')} />
                    I understand 我明白
                </p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level01
