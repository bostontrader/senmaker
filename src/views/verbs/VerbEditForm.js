import React from 'react'

import {VerbPanelLevel} from '../../data/verbs/VerbConstants'
import TenseSelect from './PastTenseRuleSelect'

function VerbEditForm(props) {

    const onDelete = () => props.onDeleteVerb(props.addEditVerb.getIn(['verb','id']))
    const onUpdate = () => props.onUpdateVerb(props.addEditVerb.get('verb'))

    let verbEditForm = <div>Verb Edit Form</div>

    if( props.level.get('currentAppLevelConfig').get('verbPanel') >= VerbPanelLevel.PAST_TENSE) {
        verbEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text' value={props.editingVerb.base}  onChange={onChange}/>
                <TenseSelect pastTense_rule={props.editingVerb.pastTense_rule}/>
                <input type='submit' value={"Save"}/>
                <button onClick={onDelete}>Delete</button>
                <button onClick={props.onCancelVerb}>Cancel</button>
            </div>
    } else if( props.level.get('currentAppLevelConfig').get('verbPanel') >= VerbPanelLevel.BASE) {
        verbEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text' value={props.addEditVerb.getIn(['verb','base'])}  onChange={(e)=>props.onChangeBase(e.target.value)}/>
                <input type='submit' value={"Save"} onClick={onUpdate}/>
                <button onClick={onDelete}>Delete</button>
                <button onClick={props.onCancelVerb}>Cancel</button>
            </div>
    }

    return verbEditForm

}

export default VerbEditForm
