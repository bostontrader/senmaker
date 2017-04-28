import React from 'react'

import VerbdAddForm  from './addedit/VerbdAddForm'
import VerbdEditForm from './addedit/VerbdEditForm'
import VerbdTable    from './VerbdTable'
import VerbdActions  from '../../../data/dictionary/verbd/VerbdActions'

/*
The VerbdPanel is responsible for displaying everything about our list of verbd.  Such
the table of Verbs, and the add or edit forms.

Specifically excluded from this are any help or navigation features to proceed to different levels.
 */
function VerbdPanel(props) {

    console.log('props.verbdPanelLevel',props.verbdPanelLevel)
    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings

    // What should be displayed in the verbd add/edit panel?
    let verbAddEditForm = <div></div>  // we really want nothing here
    if(props.verbd.getIn(['addedit','verbd','id'])) {
        verbAddEditForm = <VerbdEditForm {...props} />
    } else if (props.verbd.getIn(['addedit','addVerbd'])) {
        verbAddEditForm = <VerbdAddForm {...props} />
    } else {
        // Do nothing
    }

    // The appearance of a VerbdPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-verbd" onClick={VerbdActions.onClickAddVerbd}>{s.add_new} {s.verb}</button>
            <VerbdTable {...props} />
        </div>
        <div>
            {verbAddEditForm}
        </div>
    </div>)
    
}

export default VerbdPanel
