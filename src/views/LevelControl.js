import React from 'react'

/**
The LevelControl is responsible for displaying the control to adjust
 the application level.  It is not affected by the app level so there's
 no need to deal with that.
 */
function LevelControl(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings.LevelControl

    const previousButton = (props.level.get('minLevel')) ? '' :
        <button id="level-previous" onClick={props.onLevelPrevious}>{s.previousLevel}</button>

    const currentLevel = props.level.get('currentLevel')
    const currentQuizState = props.level.getIn(['quizResults',currentLevel])
    const maxLevel = props.level.get('maxLevel')
    const showNextButton = currentQuizState && !maxLevel

    let nextButton = ''
    if(showNextButton) {
        nextButton = <button id="level-next" onClick={props.onLevelNext}>{s.nextLevel}</button>
    }

    // Always have a reset button unless we're at the minLevel already _and_ that
    // quiz has not yet been passed.
    const resetButton = (props.level.get('minLevel') && !currentQuizState) ? '' :
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
