// @flow
import React from 'react'

import VerbdAEForm   from './addedit/VerbdAEForm'
import VerbdTable    from './VerbdTable'
import VerbdActions  from '../../../data/dictionary/verbd/VerbdActions'

/*
The VerbdPanel is responsible for displaying everything about our list of verbd.  Such
the table of Verbs, and the add or edit forms.
 */
function VerbdPanel(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const s:Object = props.strings

    // What should be displayed in the verbd add/edit panel?
    let noundAEForm:Object = <div></div>  // we really want nothing here
    if(props.verbd.getIn(['addedit','verbd','id']) || props.verbd.getIn(['addedit','addVerbd'])) {
        noundAEForm = <VerbdAEForm {...props} />
    //} else if (props.verbd.getIn(['addedit','addVerbd'])) {
        //noundAEForm = <VerbdAddForm {...props} />
    } else {
        // A suitable default is already set, so do nothing
    }

    // The appearance of a VerbdPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-verbd" onClick={VerbdActions.onClickAddVerbd}>{s.add_new} {s.verb}</button>
            <VerbdTable {...props} />
        </div>
        <div>
            {noundAEForm}
        </div>
    </div>)
    
}

export default VerbdPanel
