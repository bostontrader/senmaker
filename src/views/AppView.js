import React from 'react'

import Level00 from './Level00'
import Level01 from './Level01'
import Level02 from './Level02'

function AppView(props) {
    let levelComponent

    switch(props.level) {

        case 0:
            levelComponent = <Level00 {...props} />
            break;

        case 1:
            levelComponent = <Level01 {...props} />
            break;

        case 2:
            levelComponent = <Level02 {...props} />
            break;

        default:
            levelComponent = <div>Unknown level</div>
    }

    return (
        <div className="container">
            <div className="row">
                {levelComponent}
            </div>
        </div>
    )

}

export default AppView
