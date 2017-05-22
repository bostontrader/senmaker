// @flow
import React from 'react'

import VerbdTable   from './VerbdTable'
import VerbdAEForm  from './addedit/VerbdAEForm'
import VerbdActions from '../../../data/dictionary/verbd/VerbdActions'

/*
The VerbdPanel is responsible for displaying everything about our list of verbd.  Such
the table of Verbs, and the add or edit forms.
 */
function VerbdPanel(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    // What should be displayed in the verbd add/edit panel?
    let verbdAEForm:?Object = null
    if(props.verbd.getIn(['addedit','verbd','id']) || props.verbd.getIn(['addedit','addVerbd']))
        verbdAEForm = <VerbdAEForm {...props} />

    // The appearance of a VerbdPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-verbd" onClick={VerbdActions.onClickAddVerbd}>{sm.add_new} {sm.verb}</button>
            <VerbdTable {...props} />
        </div>
        <div>
            {verbdAEForm}
        </div>
    </div>)
    
}

export default VerbdPanel
