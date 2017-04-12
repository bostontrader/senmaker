import React from 'react'

import NPAEActions from '../../data/np/addedit/NPAEActions'

import NPAddForm  from './addedit/NPAddForm'
import NPEditForm from './addedit/NPEditForm'
import NPTable    from './NPTable'

/*
The NPPanel is responsible for displaying everything about our list of NP.  Such as
the table of NP, and the add or edit forms.
 */
function NPPanel(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings

    // What should be displayed in the np add/edit panel?
    let npAddEditForm = <div></div>  // we really want nothing here
    if(props.np.getIn(['addEditNP','np','id'])) {
        npAddEditForm = <NPEditForm {...props} />
    } else if (props.np.getIn(['addEditNP','addNP'])) {
        npAddEditForm = <NPAddForm {...props} />
    } else {
        // Do nothing
    }

    return(
        <div style={style}>
            <div>
                <button id="add-np" onClick={NPAEActions.onClickAddNP}>{s.add_new} {s.noun_phrase}</button>
                <NPTable {...props} />
            </div>
            <div>
                {npAddEditForm}
            </div>
        </div>
    )
}

export default NPPanel
