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

    const previousButton = (props.level.app === 0) ? '' :
        <button id="level-previous" onClick={props.onLevelPrevious}>Previous Level</button>

    const nextButton = (props.level.app >= props.level.maxLevel) ? '' :
        <button id="level-next" onClick={props.onLevelNext}>Next Level</button>

    return (
        <div className="level-control" style={style}>
            <p>Level {props.level.app}</p>
            {previousButton}
            {nextButton}
            <button  id="level-reset" onClick={props.onLevelReset}>Reset</button>
        </div>
    )

}

export default LevelControl
