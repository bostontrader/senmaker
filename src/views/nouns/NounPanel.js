import React from 'react'

import NounAddForm from './NounAddForm'
import NounEditForm from './NounEditForm'
import NounTable from './NounTable'

/*
The NounPanel is responsible for displaying everything about our list of nouns.  Such
the table of Nouns, and the add or edit forms.

Specifically excluded from this are any help or navigation features to proceed to different levels.
 */
function NounPanel(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    // What should be displayed in the noun add/edit panel?
    let nounAddEditPanel = <div></div>  // we really want nothing here
    if(props.addEditNoun.get('noun').get('id')) {
        nounAddEditPanel = <NounEditForm {...props} />
    } else if (props.addEditNoun.get('addNoun')) {
        nounAddEditPanel = <NounAddForm {...props} />
    } else {
        // Do nothing
    }

    // The appearance of a NounPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button onClick={props.onAddNoun}>Add new noun</button>
            <NounTable {...props} />
        </div>
        <div>
            {nounAddEditPanel}
        </div>
    </div>)

}

export default NounPanel
