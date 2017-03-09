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
                <p>This program will help you build an English composition. 这个程序将帮助您建立一个英语作文。</p>
                <p>In order to do that you must first learn how to build smaller pieces of English.为了做到这一点你必须首先学习如何构建英语的小块（句子和段落）。</p>
                <p>You can then assemble the small pieces of English into larger components.然后,您可以将英语的小块组装成更大的组件。
                </p>
                <p>You will learn how to do this by following these lessons通过以下课程您将知道如何学习英语。
                </p>
                <p>You are presently on Level 0. In order to proceed to the next level you will need to pass the quiz.你目前是0级，为了继续下一个阶段需要通过测验。
                </p>
            </div>
            <div className="quiz" style={style}>
                <h3>Quiz测试</h3>
                <p>
                    <input onChange={props.onQuizToggle} type="checkbox" checked={props.level.get('quiz')} />
                    I understand 我明白
                </p>
            </div>
            <LevelControl {...props} />
        </div>
    )
}

export default Level00
