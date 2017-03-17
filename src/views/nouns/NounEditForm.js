import React from 'react'

import {NounPanelLevel} from '../../data/nouns/NounConstants'
import PluralizationSelect from './PluralizationSelect'

function NounEditForm(props) {

    const onDelete = () => props.onDeleteNoun(props.addEditNoun.getIn(['noun','id']))
    const onUpdate = () => props.onUpdateNoun(props.addEditNoun.get('noun'))
    const s = props.strings

    let nounEditForm = <div>Noun Edit Form</div>

    if(props.level.getIn(['currentAppLevelConfig','nounPanel']) >= NounPanelLevel.PLURALIZATION) {
        nounEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.addEditNoun.getIn(['noun','base'])} onChange={(e)=>props.onChangeBase(e.target.value)}/>
                <PluralizationSelect pluralization_rule={0}/>
                <input id='save' type='submit' value={s.save}/>
                <button id='delete' onClick={onDelete}>{s.delete}</button>
                <button onClick={props.onCancelNoun}>{s.cancel}</button>
            </div>
    } else if(props.level.getIn(['currentAppLevelConfig','nounPanel']) >= NounPanelLevel.BASE) {
        nounEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.addEditNoun.getIn(['noun','base'])} onChange={(e)=>props.onChangeBase(e.target.value)}/>
                <input id='save' type='submit' value={s.save} onClick={onUpdate}/>
                <button id='delete' onClick={onDelete}>{s.delete}</button>
                <button id='cancel' onClick={props.onCancelNoun}>{s.cancel}</button>
            </div>
    }

    return (nounEditForm)

}

export default NounEditForm
