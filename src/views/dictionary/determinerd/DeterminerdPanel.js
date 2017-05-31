// @flow
import React from 'react'

import DeterminerdTable   from './DeterminerdTable'
import DeterminerdAEForm  from './addedit/DeterminerdAEForm'
import DeterminerdActions from '../../../data/dictionary/determinerd/DeterminerdActions'

/*
The DeterminerdPanel is responsible for displaying everything about our list of determinerd.  Such
the table of Determinerd, and the add or edit forms.
 */
function DeterminerdPanel(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    // What should be displayed in the determinerd add/edit panel?
    let determinerdAEForm:?Object = null
    if(props.determinerd.getIn(['addedit','determinerd','id']) || props.determinerd.getIn(['addedit','addDeterminerd']))
        determinerdAEForm = <DeterminerdAEForm {...props} />

    // The appearance of a DeterminerdPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-determinerd" onClick={DeterminerdActions.onClickAddDeterminerd}>{sm.add_new} {'Determiner'}</button>
            <DeterminerdTable {...props} />
        </div>
        <div>
            {determinerdAEForm}
        </div>
    </div>)

}

export default DeterminerdPanel
