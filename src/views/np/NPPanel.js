import React from 'react'

import NPAddForm  from './addedit/NPAddForm'
import NPEditForm from './addedit/NPEditForm'
import NPTable    from './NPTable'
import NPActions  from '../../data/np/NPActions'

/*
The NPPanel is responsible for displaying everything about our list of np.  Such
the table of NP, and the add or edit forms.

Specifically excluded from this are any help or navigation features to proceed to different levels.
 */
function NPPanel(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings

    // What should be displayed in the np add/edit panel?
    let nounAddEditForm = <div></div>  // we really want nothing here
    if(props.np.getIn(['addedit','np','id'])) {
        nounAddEditForm = <NPEditForm {...props} />
    } else if (props.np.getIn(['addedit','addNP'])) {
        nounAddEditForm = <NPAddForm {...props} />
    } else {
        // Do nothing
    }

    // The appearance of a NPPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-np" onClick={NPActions.onClickAddNP}>{s.add_new} {'Noun Phrase'}</button>
            <NPTable {...props} />
        </div>
        <div>
            {nounAddEditForm}
        </div>
    </div>)

}

export default NPPanel
