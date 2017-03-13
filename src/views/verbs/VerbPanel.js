import React from 'react'

import VerbAddForm from './VerbAddForm'
import VerbEditForm from './VerbEditForm'
import VerbTable from './VerbTable'

/*
The VerbPanel is responsible for displaying everything about our list of verbs.  Such
the table of Verbs, and the add or edit forms.

Specifically excluded from this are any help or navigation features to proceed to different levels.
 */
function VerbPanel(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    // What should be displayed in the verb add/edit panel?
    let verbAddEditForm = <div></div>  // we really want nothing here
    if(props.addEditVerb.getIn(['verb','id'])) {
        verbAddEditForm = <VerbEditForm {...props} />
    } else if (props.addEditVerb.get('addVerb')) {
        verbAddEditForm = <VerbAddForm {...props} />
    } else {
        // Do nothing
    }

    // The appearance of a VerbPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button onClick={props.onAddVerb}>Add new verb</button>
            <VerbTable {...props} />
        </div>
        <div>
            {verbAddEditForm}
        </div>
    </div>)
    
}

export default VerbPanel
