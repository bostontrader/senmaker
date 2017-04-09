import React from 'react'

import VerbdAEActions from '../../../data/dictionary/verbd/addedit/VerbdAEActions'

import VerbdAddForm  from './addedit/VerbdAddForm'
import VerbdEditForm from './addedit/VerbdEditForm'
import VerbdTable    from './VerbdTable'

/*
The VerbdPanel is responsible for displaying everything about our list of verbd.  Such
the table of Verbs, and the add or edit forms.

Specifically excluded from this are any help or navigation features to proceed to different levels.
 */
function VerbdPanel(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings

    // What should be displayed in the verbd add/edit panel?
    let verbAddEditForm = <div></div>  // we really want nothing here
    if(props.verbd.getIn(['addEditVerbd','verbd','id'])) {
        verbAddEditForm = <VerbdEditForm {...props} />
    } else if (props.verbd.getIn(['addEditVerbd','addVerbd'])) {
        verbAddEditForm = <VerbdAddForm {...props} />
    } else {
        // Do nothing
    }

    // The appearance of a VerbdPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-verbd" onClick={VerbdAEActions.onClickAddVerbd}>{s.add_new} {s.verb}</button>
            <VerbdTable {...props} />
        </div>
        <div>
            {verbAddEditForm}
        </div>
    </div>)
    
}

export default VerbdPanel
