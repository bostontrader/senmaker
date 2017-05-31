// @flow
import React from 'react'

import ConjunctiondTable   from './ConjunctiondTable'
import ConjunctiondAEForm  from './addedit/ConjunctiondAEForm'
import ConjunctiondActions from '../../../data/dictionary/conjunctiond/ConjunctiondActions'

/*
The ConjunctiondPanel is responsible for displaying everything about our list of conjunctiond.  Such
the table of Conjunctiond, and the add or edit forms.
 */
function ConjunctiondPanel(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    // What should be displayed in the conjunctiond add/edit panel?
    let conjunctiondAEForm:?Object = null
    if(props.conjunctiond.getIn(['addedit','conjunctiond','id']) || props.conjunctiond.getIn(['addedit','addConjunctiond']))
        conjunctiondAEForm = <ConjunctiondAEForm {...props} />

    // The appearance of a ConjunctiondPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-conjunctiond" onClick={ConjunctiondActions.onClickAddConjunctiond}>{sm.add_new} {'Conjunction'}</button>
            <ConjunctiondTable {...props} />
        </div>
        <div>
            {conjunctiondAEForm}
        </div>
    </div>)

}

export default ConjunctiondPanel
