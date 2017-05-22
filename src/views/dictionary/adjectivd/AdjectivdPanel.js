// @flow
import React from 'react'

import AdjectivdAEForm  from './addedit/AdjectivdAEForm'
import AdjectivdTable   from './AdjectivdTable'
import AdjectivdActions from '../../../data/dictionary/adjectivd/AdjectivdActions'

/*
 The AdjectivdPanel is responsible for displaying everything about our list of adjectivd.  Such
 the table of Adjectivd, and the add or edit forms.
 */
function AdjectivdPanel(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    // What should be displayed in the adjectivd add/edit panel?
    let nounAddEditForm:?Object = null
    if(props.adjectivd.getIn(['addedit','adjectivd','id']) || props.adjectivd.getIn(['addedit','addAdjectivd']))
        nounAddEditForm = <AdjectivdAEForm {...props} />

    // The appearance of a AdjectivdPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-adjectivd" onClick={AdjectivdActions.onClickAddAdjectivd}>{sm.add_new} {'Adjective'}</button>
            <AdjectivdTable {...props} />
        </div>
        <div>
            {nounAddEditForm}
        </div>
    </div>)

}

export default AdjectivdPanel
