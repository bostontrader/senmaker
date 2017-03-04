import React from 'react'

/**
The LevelControl is responsible for displaying the control to adjust
 the application level.  It is not affected by the app level so there's
 no need to deal with that.
 */
function LevelControl(props) {

    return (
        <div>
            <p>Level {props.level.app}</p>
            <button href="#" onClick={props.onLevelPrevious}>Previous Level</button>
            <button href="#" onClick={props.onLevelNext}>Next Level</button>
            <button href="#" onClick={props.onLevelReset}>Reset</button>
        </div>
    )

}

export default LevelControl
