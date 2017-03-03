import React from 'react'

/**
The LevelControl is responsible for displaying the control to adjust
 the application level.  It is not affected by the app level so there's
 no need to deal with that.
 */
function LevelControl(props) {

    return (
        <div>
            <button>Previous Level</button>
            <button>Next Level</button>
            <button>Reset</button>
        </div>
    )

}

export default LevelControl
