import React from 'react'

import NoundAddForm from './addedit/NoundAddForm'
import NoundEditForm from './addedit/NoundEditForm'
import NoundTable from './NoundTable'

/*
The NoundPanel is responsible for displaying everything about our list of nound.  Such
the table of Nound, and the add or edit forms.

Specifically excluded from this are any help or navigation features to proceed to different levels.
 */
function NoundPanel(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings

    // What should be displayed in the nound add/edit panel?
    let nounAddEditForm = <div></div>  // we really want nothing here
    if(props.nound.getIn(['addEditNound','nound','id'])) {
        nounAddEditForm = <NoundEditForm {...props} />
    } else if (props.nound.getIn(['addEditNound','addNound'])) {
        nounAddEditForm = <NoundAddForm {...props} />
    } else {
        // Do nothing
    }

    // The appearance of a NoundPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-nound" onClick={props.nound.getIn(['onClickAddNound'])}>{s.add_new} {s.noun}</button>
            <NoundTable {...props} />
        </div>
        <div>
            {nounAddEditForm}
        </div>
    </div>)

}

export default NoundPanel
