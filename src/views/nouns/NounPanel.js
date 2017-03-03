import React from 'react'

import NounAddForm from './NounAddForm'
import NounEditForm from './NounEditForm'
import {NounPanelLevel} from '../../data/nouns/NounConstants'
import NounTable from './NounTable'

/*
The NounPanel is responsible for displaying everything about our list of nouns.  Such
as introductory text, the table of Nouns, and the add or edit forms.

It is responsible for changing this UI according to the present level.

Specifically excluded from this are navigation features to proceed to different levels
as well as any testing for the same.
 */
function NounPanel(props) {

    // What should be displayed in the noun add/edit panel?
    let nounAddEditPanel = <div>nounAddEditPanel</div>
    if(props.editingNoun.id) {
        nounAddEditPanel = <NounEditForm {...props} />
    } else if (props.editingNoun.add) {
        nounAddEditPanel = <NounAddForm {...props} />
    } else {
        // Do nothing
    }

    let nounPanel = <div>Noun Panel</div>
    if(props.level.nounPanel >= NounPanelLevel.PLURALIZATION) {
        nounPanel =
            <div>
                <div className="row">
                    <h1>Nouns</h1>
                    <p>The things around us are called <strong>nouns</strong>.</p>
                    <p>When we write nouns must know how many of something we are writing about.  For example are we writing about one cat or more than one cat?</p>
                    <p>If we are writing about only one of something, then we use the base form of the noun.</p>
                    <p>If we are writing about more than one, then we use the plural form of the noun.</p>
                </div>
                <div className="row">
                    <div className="one-half column">
                        <button onClick={props.onAddNoun}>Add new noun</button>
                        <NounTable {...props} />
                    </div>
                    <div className="one-half column">
                        {nounAddEditPanel}
                    </div>
                </div>
            </div>
    } else if(props.level.nounPanel >= NounPanelLevel.BASE) {
        nounPanel =
            <div>
                <div className="row">
                    <h1>Nouns</h1>
                    <p>The things around us are called <strong>nouns</strong>.</p>
                </div>
                <div className="row">
                    <div className="one-half column">
                        <button onClick={props.onAddNoun}>Add new noun</button>
                        <NounTable {...props} />
                    </div>
                    <div className="one-half column">
                        {nounAddEditPanel}
                    </div>
                </div>
            </div>
    }

    return(nounPanel)

}

export default NounPanel
