import React from 'react'

import VerbAddForm from './VerbAddForm'
import VerbEditForm from './VerbEditForm'
import VerbTable from './VerbTable'
import {VerbPanelLevel} from '../../data/verbs/VerbConstants'

/*
The VerbPanel is responsible for displaying everything about our list of verbs.  Such
as introductory text, the table of Verbs, and the add or edit forms.

It is responsible for changing this UI according to the present level.

Specifically excluded from this are navigation features to proceed to different levels
as well as any testing for the same.
 */
function VerbPanel(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    // What should be displayed in the verb add/edit panel?
    let verbAddEditPanel = <div></div>  // we really want nothing here
    if(props.editingVerb.id) {
        verbAddEditPanel = <VerbEditForm {...props} />
    } else if (props.editingVerb.add) {
        verbAddEditPanel = <VerbAddForm {...props} />
    } else {
        // Do nothing
    }

    let verbPanel = <div>Verb Panel</div>
    if(props.level.get('currentAppLevelConfig').get('verbPanel') >= VerbPanelLevel.PAST_TENSE) {
        verbPanel =
            <div>
                <div style={style}>
                    <h1>Verbs</h1>
                    <p>We start with a 'base' form of the verb and then we make changes to it according to the rules of grammar.</p>
                    <p>For example: If we performed the verb in the past we use the 'past tense' form of them verb.</p>
                    <p>The base form of the verb is changed into the past-tense form according to certain rules.</p>
                </div>
                <div style={style}>
                    <div>
                        <button onClick={props.onAddVerb}>Add new verb</button>
                        <VerbTable {...props} />
                    </div>
                    <div>
                        {verbAddEditPanel}
                    </div>
                </div>
            </div>
    } else if(props.level.get('currentAppLevelConfig').get('verbPanel') >= VerbPanelLevel.BASE) {
        verbPanel =
            <div>
                <div style={style}>
                    <h1>Verbs</h1>
                    <p>The actions we can take are called <strong>verbs</strong>.</p>
                </div>
                <div style={style}>
                    <div>
                        <button onClick={props.onAddVerb}>Add new verb</button>
                        <VerbTable {...props} />
                    </div>
                    <div>
                        {verbAddEditPanel}
                    </div>
                </div>
            </div>
    }

    return(verbPanel)

}

export default VerbPanel
