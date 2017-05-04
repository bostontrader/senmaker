// @flow
import React from 'react'

import NPAEForm  from './addedit/NPAEForm'
import NPTable    from './NPTable'
import NPActions  from '../../data/np/NPActions'

/*
The NPPanel is responsible for displaying everything about our list of np.  Such
the table of NP, and the add or edit forms.
 */
function NPPanel(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const s:Object = props.strings

    // What should be displayed in the np add/edit panel?
    let npAEForm:?Object = null
    if(props.np.getIn(['addedit','np','id']) || props.np.getIn(['addedit','addNP']))
        npAEForm = <NPAEForm {...props} />

    // The appearance of a NPPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-np" onClick={NPActions.onClickAddNP}>{s.add_new} {'Noun Phrase'}</button>
            <NPTable {...props} />
        </div>
        <div>
            {npAEForm}
        </div>
    </div>)

}

export default NPPanel
