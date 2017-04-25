import React from 'react'

import VPAddForm  from './addedit/VPAddForm'
import VPEditForm from './addedit/VPEditForm'
import VPTable    from './VPTable'
import VPActions  from '../../data/vp/VPActions'

/*
The VPPanel is responsible for displaying everything about our list of vp.  Such
the table of VP, and the add or edit forms.

Specifically excluded from this are any help or navigation features to proceed to different levels.
 */
function VPPanel(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings

    // What should be displayed in the vp add/edit panel?
    let nounAddEditForm = <div></div>  // we really want nothing here
    if(props.vp.getIn(['addedit','vp','id'])) {
        nounAddEditForm = <VPEditForm {...props} />
    } else if (props.vp.getIn(['addedit','addVP'])) {
        nounAddEditForm = <VPAddForm {...props} />
    } else {
        // Do nothing
    }

    // The appearance of a VPPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-vp" onClick={VPActions.onClickAddVP}>{s.add_new} {'verb'}</button>
            <VPTable {...props} />
        </div>
        <div>
            {nounAddEditForm}
        </div>
    </div>)

}

export default VPPanel
