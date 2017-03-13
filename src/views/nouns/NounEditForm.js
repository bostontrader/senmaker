import React from 'react'

import {NounPanelLevel} from '../../data/nouns/NounConstants'
import PluralizationSelect from './PluralizationSelect'

function NounEditForm(props) {

    const onDelete = () => props.onDeleteNoun(props.addEditNoun.getIn(['noun','id']))
    const onUpdate = () => props.onUpdateNoun(props.addEditNoun.get('noun'))

    let nounEditForm = <div>Noun Edit Form</div>
    if(props.level.get('currentAppLevelConfig').get('nounPanel') >= NounPanelLevel.PLURALIZATION) {
        nounEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text' value={props.addEditNoun.getIn(['noun','base'])}  onChange={(e)=>props.onChangeBase(e.target.value)}/>
                <PluralizationSelect pluralization_rule={0}/>
                <input type='submit' value={"Save"}/>
                <button onClick={onDelete}>Delete</button>
                <button onClick={props.onCancelNoun}>Cancel</button>
            </div>
    } else if(props.level.get('currentAppLevelConfig').get('nounPanel') >= NounPanelLevel.BASE) {
        nounEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text' value={props.addEditNoun.getIn(['noun','base'])}  onChange={(e)=>props.onChangeBase(e.target.value)}/>
                <input type='submit' value="Save" onClick={onUpdate}/>
                <button onClick={onDelete}>Delete</button>
                <button onClick={props.onCancelNoun}>Cancel</button>
            </div>
    }

    return (nounEditForm)

}

export default NounEditForm
