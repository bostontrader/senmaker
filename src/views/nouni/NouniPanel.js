import React from 'react'

import NouniAEActions from '../../data/nouni/addedit/NouniAEActions'

import NouniAddForm  from './addedit/NouniAddForm'
import NouniEditForm from './addedit/NouniEditForm'
import NouniTable    from './NouniTable'

/*
The NouniPanel is responsible for displaying everything about our list of nouni.  Such
the table of Nouni, and the add or edit forms.

Specifically excluded from this are any help or navigation features to proceed to different levels.
 */
function NouniPanel(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings

    // What should be displayed in the nouni add/edit panel?
    let nounAddEditForm = <div></div>  // we really want nothing here
    if(props.nouni.getIn(['addEditNouni','nouni','id'])) {
        nounAddEditForm = <NouniEditForm {...props} />
    } else if (props.nouni.getIn(['addEditNouni','addNouni'])) {
        nounAddEditForm = <NouniAddForm {...props} />
    } else {
        // Do nothing
    }

    // The appearance of a NouniPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-nouni" onClick={NouniAEActions.onClickAddNouni}>{s.add_new} {s.noun}</button>
            <NouniTable {...props} />
        </div>
        <div>
            {nounAddEditForm}
        </div>
    </div>)

}

export default NouniPanel
