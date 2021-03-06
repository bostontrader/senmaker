// @flow
import React from 'react'

import NoundTable   from './NoundTable'
import NoundAEForm  from './addedit/NoundAEForm'
import NoundActions from '../../../data/dictionary/nound/NoundActions'

/*
The NoundPanel is responsible for displaying everything about our list of nound.  Such
the table of Nound, and the add or edit forms.
 */
function NoundPanel(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    // What should be displayed in the nound add/edit panel?
    let noundAEForm:?Object = null
    if(props.nound.getIn(['addedit','nound','id']) || props.nound.getIn(['addedit','addNound']))
        noundAEForm = <NoundAEForm {...props} />

    // The appearance of a NoundPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-nound" onClick={NoundActions.onClickAddNound}>{sm.add_new} {sm.noun}</button>
            <NoundTable {...props} />
        </div>
        <div>
            {noundAEForm}
        </div>
    </div>)

}

export default NoundPanel
