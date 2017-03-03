import React from 'react'

import {VerbPanelLevel} from '../../data/verbs/VerbConstants'
import TenseSelect from './PastTenseRuleSelect'

function VerbForm(props) {

    const onChange = () => {}
    const onDelete = () => props.onDeleteVerb(props.editingVerb.id)

    let verbEditForm = <div>Verb Edit Form</div>

    if( props.level >= VerbPanelLevel.PAST_TENSE) {
        verbEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text' value={props.editingVerb.base}  onChange={onChange}/>
                <TenseSelect pastTense_rule={props.editingVerb.pastTense_rule}/>
                <input type='submit' value={"Save (id = " +props.editingVerb.id+ ")"}/>
                <button onClick={onDelete}>Delete</button>
                <button onClick={props.onCancelVerb}>Cancel</button>
            </div>
    } else if( props.level >= VerbPanelLevel.BASE) {
        verbEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text' value={props.editingVerb.base}  onChange={onChange}/>
                <input type='submit' value={"Save (id = " +props.editingVerb.id+ ")"}/>
                <button onClick={onDelete}>Delete</button>
                <button onClick={props.onCancelVerb}>Cancel</button>
            </div>
    }

    return verbEditForm

}

export default VerbForm
