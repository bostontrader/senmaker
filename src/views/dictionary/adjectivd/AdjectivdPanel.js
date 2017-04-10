import React from 'react'

import AdjectivdAEActions from '../../../data/dictionary/adjectivd/addedit/AdjectivdAEActions'

import AdjectivdAddForm  from './addedit/AdjectivdAddForm'
import AdjectivdEditForm from './addedit/AdjectivdEditForm'
import AdjectivdTable    from './AdjectivdTable'

/*
The AdjectivdPanel is responsible for displaying everything about our list of adjectivd.  Such
the table of Adjectivd, and the add or edit forms.

Specifically excluded from this are any help or navigation features to proceed to different levels.
 */
function AdjectivdPanel(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings

    // What should be displayed in the adjectivd add/edit panel?
    let adjectivAddEditForm = <div></div>  // we really want nothing here
    if(props.adjectivd.getIn(['addEditAdjectivd','adjectivd','id'])) {
        adjectivAddEditForm = <AdjectivdEditForm {...props} />
    } else if (props.adjectivd.getIn(['addEditAdjectivd','addAdjectivd'])) {
        adjectivAddEditForm = <AdjectivdAddForm {...props} />
    } else {
        // Do nothing
    }

    // The appearance of a AdjectivdPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-adjectivd" onClick={AdjectivdAEActions.onClickAddAdjectivd}>{s.add_new} {s.adjectiv}</button>
            <AdjectivdTable {...props} />
        </div>
        <div>
            {adjectivAddEditForm}
        </div>
    </div>)

}

export default AdjectivdPanel
