// @flow
import React from 'react'

import PrepositiondAEForm  from './addedit/PrepositiondAEForm'
import PrepositiondTable   from './PrepositiondTable'
import PrepositiondActions from '../../../data/dictionary/prepositiond/PrepositiondActions'

/*
 The PrepositiondPanel is responsible for displaying everything about our list of prepositiond.  Such
 the table of Prepositiond, and the add or edit forms.
 */
function PrepositiondPanel(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    // What should be displayed in the prepositiond add/edit panel?
    let prepositiondAEForm:?Object = null
    if(props.prepositiond.getIn(['addedit','prepositiond','id']) || props.prepositiond.getIn(['addedit','addPrepositiond']))
        prepositiondAEForm = <PrepositiondAEForm {...props} />

    // The appearance of a PrepositiondPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-prepositiond" onClick={PrepositiondActions.onClickAddPrepositiond}>{sm.add_new} {'Preposition'}</button>
            <PrepositiondTable {...props} />
        </div>
        <div>
            {prepositiondAEForm}
        </div>
    </div>)

}

export default PrepositiondPanel
