// @flow
import React from 'react'

import ClauseTable   from './ClauseTable'
import ClauseAEForm  from './addedit/ClauseAEForm'
import ClauseActions from '../../data/clause/ClauseActions'

/*
The ClausePanel is responsible for displaying everything about our list of clause.  Such
the table of Clause, and the add or edit forms.
 */
function ClausePanel(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    // What should be displayed in the nound add/edit panel?
    let clauseAEForm:?Object = null
    if(props.clause.getIn(['addedit','clause','id']) || props.clause.getIn(['addedit','addClause']))
        clauseAEForm = <ClauseAEForm {...props} />

    /*
    // What should be displayed in the clause add/edit panel?
    let clauseAddEditForm:Object = <div></div>  // we really want nothing here
    if(props.clause.getIn(['addedit','clause','id'])) {
        clauseAddEditForm = <ClauseEditForm {...props} />
    } else if (props.clause.getIn(['addedit','addClause'])) {
        clauseAddEditForm = <ClauseAddForm {...props} />
    } else {
        // Do nothing
    }*/

    // The appearance of a ClausePanel is not affected by the level.
    return( <div style={style}>
        <div>
            <button id="add-clause" onClick={ClauseActions.onClickAddClause}>{sm.add_new} {'clause'}</button>
            <ClauseTable {...props} />
        </div>
        <div>
            {clauseAEForm}
        </div>
    </div>)

}

export default ClausePanel
