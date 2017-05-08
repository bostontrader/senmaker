// @flow
import React from 'react'

import VPAEForm  from './addedit/VPAEForm'
import VPTable   from './VPTable'
import VPActions from '../../data/vp/VPActions'

/*
The VPPanel is responsible for displaying everything about our list of vp.  Such
the table of VP, and the add or edit forms.
 */
function VPPanel(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const s:Object = props.strings

    // What should be displayed in the vp add/edit panel?
    let vpAEForm:?Object = null
    if(props.vp.getIn(['addedit','vp','id']) || props.vp.getIn(['addedit','addVP']))
        vpAEForm = <VPAEForm {...props} />

    // The appearance of a VPPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-vp" onClick={VPActions.onClickAddVP}>{s.add_new} {'Verb Phrase'}</button>
            <VPTable {...props} />
        </div>
        <div>
            {vpAEForm}
        </div>
    </div>)

}

export default VPPanel
