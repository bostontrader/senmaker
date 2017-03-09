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

    //console.log('LevelControl 1=',props.level)
    const previousButton = (props.level.get('minLevel')) ? '' :
        <button id="level-previous" onClick={props.onLevelPrevious}>Previous Level</button>

    //const nextButton = ( (!props.level.quiz) || props.level.maxLevel) ? '' :
    let n1 = props.level.get('quiz')
    let n2 = props.level.get('maxLevel')
    let n3 = n1 && !n2
    //const nextButton = ( props.level.quiz && !props.level.maxLevel) ? '' :
    //const nextButton = ( n3) ? 'nb' :
        //<button id="level-next" onClick={props.onLevelNext}>Next Level</button>
    let nextButton
    if(n3) {
        nextButton = <button id="level-next" onClick={props.onLevelNext}>Next Level</button>
    } else {
        nextButton = ''
    }

    const resetButton = (props.level.get('minLevel') && !props.level.get('quiz')) ? '' :
        <button id="level-reset" onClick={props.onLevelReset}>Reset</button>

    return (
        <div className="level-control" style={style}>
            <p>Level {props.level.get('currentLevel')}</p>
            {previousButton}
            {nextButton}
            {resetButton}
        </div>
    )

}

export default LevelControl
