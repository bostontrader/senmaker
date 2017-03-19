import React from 'react'

import Level00 from './Level00'
import Level01 from './Level01'
import Level02 from './Level02'
import Level03 from './Level03'
import Level04 from './Level04'
import Level05 from './Level05'
import Level06 from './Level06'
import Level07 from './Level07'

function AppView(props) {

    let levelComponent

    switch(props.level.get('currentLevel')) {

        case 0:
            levelComponent = <Level00 {...props} />
            break

        case 1:
            levelComponent = <Level01 {...props} />
            break

        case 2:
            levelComponent = <Level02 {...props} />
            break

        case 3:
            levelComponent = <Level03 {...props} />
            break

        case 4:
            levelComponent = <Level04 {...props} />
            break

        case 5:
            levelComponent = <Level05 {...props} />
            break

        case 6:
            levelComponent = <Level06 {...props} />
            break

        case 7:
            levelComponent = <Level07 {...props} />
            break

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
