import React from 'react'

/**
The LevelControl is responsible for displaying the control to adjust
 the application level.  It is not affected by the app level so there's
 no need to deal with that.
 */
function LevelControl(props) {
    //console.log('LevelControl',props)

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings.LevelControl

    const previousButton = (props.level.get('minLevel')) ? '' :
        <button id="level-previous" onClick={props.onLevelPrevious}>{s.previousLevel}</button>

    const n = props.level.get('currentLevel')
    let n1 = props.level.getIn(['quizResults',n])
    let n2 = props.level.get('maxLevel')
    let n3 = n1 && !n2
    console.log(props.level)
    console.log(n,n1,n2,n3)
    let nextButton = ''
    if(n3) {
        nextButton = <button id="level-next" onClick={props.onLevelNext}>{s.nextLevel}</button>
    }

    const resetButton = (props.level.get('minLevel') && !props.level.get('quiz')) ? '' :
        <button id="level-reset" onClick={props.onLevelReset}>{s.reset}</button>

    return (
        <div className="level-control" style={style}>
            <p>{s.level} {props.level.get('currentLevel')}</p>
            {previousButton}
            {nextButton}
            {resetButton}
            <img onClick={props.onLangEng} src="/img/us_flag.gif" width="28" height="20" alt=""/>
            <img onClick={props.onLangChn} src="/img/chinese_flag.gif" width="28" height="20" alt=""/>
        </div>
    )

}

export default LevelControl
