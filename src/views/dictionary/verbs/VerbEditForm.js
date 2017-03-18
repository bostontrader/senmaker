import React from 'react'

import {VerbPanelLevel} from '../../../data/dictionary/verbs/VerbDictionaryItemConstants'
import TenseSelect from './PastTenseRuleSelect'

function VerbEditForm(props) {

    const onDelete = () => props.onDeleteVerb(props.addEditVerb.getIn(['verb','id']))
    const onUpdate = () => props.onUpdateVerb(props.addEditVerb.get('verb'))
    const s = props.strings

    let verbEditForm = <div>Verb Edit Form</div>

    if(props.level.getIn(['currentAppLevelConfig','verbPanel']) >= VerbPanelLevel.PAST_TENSE) {
        verbEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.addEditVerb.getIn(['verb','base'])} onChange={(e)=>props.onChangeVerbBase(e.target.value)}/>
                <TenseSelect pastTense_rule={props.editingVerb.pastTense_rule}/>
                <input id='save' type='submit' value={s.save}/>
                <button id='delete' onClick={onDelete}>{s.delete}</button>
                <button onClick={props.onCancelVerb}>{s.cancel}</button>
            </div>
    } else if(props.level.getIn(['currentAppLevelConfig','verbPanel']) >= VerbPanelLevel.BASE) {
        verbEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.addEditVerb.getIn(['verb','base'])} onChange={(e)=>props.onChangeVerbBase(e.target.value)}/>
                <input id='save' type='submit' value={s.save} onClick={onUpdate}/>
                <button id='delete' onClick={onDelete}>{s.delete}</button>
                <button id='cancel' onClick={props.onCancelVerb}>{s.cancel}</button>
            </div>
    }

    return verbEditForm

}

export default VerbEditForm
