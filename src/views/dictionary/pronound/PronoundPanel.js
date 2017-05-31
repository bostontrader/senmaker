// @flow
import React from 'react'

import PronoundTable   from './PronoundTable'
import PronoundAEForm  from './addedit/PronoundAEForm'
import PronoundActions from '../../../data/dictionary/pronound/PronoundActions'

/*
The PronoundPanel is responsible for displaying everything about our list of pronound.  Such
the table of Pronound, and the add or edit forms.
 */
function PronoundPanel(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    // What should be displayed in the pronound add/edit panel?
    let pronoundAEForm:?Object = null
    if(props.pronound.getIn(['addedit','pronound','id']) || props.pronound.getIn(['addedit','addPronound']))
        pronoundAEForm = <PronoundAEForm {...props} />

    // The appearance of a PronoundPanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-pronound" onClick={PronoundActions.onClickAddPronound}>{sm.add_new} {'Pronoun'}</button>
            <PronoundTable {...props} />
        </div>
        <div>
            {pronoundAEForm}
        </div>
    </div>)

}

export default PronoundPanel
