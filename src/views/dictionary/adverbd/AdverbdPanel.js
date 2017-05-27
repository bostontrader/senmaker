// @flow
import React from 'react'

import AdverbdAEForm  from './addedit/AdverbdAEForm'
import AdverbdTable   from './AdverbdTable'
import AdverbdActions from '../../../data/dictionary/adverbd/AdverbdActions'

/*
 The AdverbdPanel is responsible for displaying everything about our list of adverbd.  Such
 the table of Adverbd, and the add or edit forms.
 */
function AdverbdPanel(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    // What should be displayed in the adverbd add/edit panel?
    let nounAddEditForm:?Object = null
    if(props.adverbd.getIn(['addedit','adverbd','id']) || props.adverbd.getIn(['addedit','addAdverbd']))
        nounAddEditForm = <AdverbdAEForm {...props} />

    // The appearance of a AdverbdPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-adverbd" onClick={AdverbdActions.onClickAddAdverbd}>{sm.add_new} {'Adverb'}</button>
            <AdverbdTable {...props} />
        </div>
        <div>
            {nounAddEditForm}
        </div>
    </div>)

}

export default AdverbdPanel
