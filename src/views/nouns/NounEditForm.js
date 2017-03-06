import React from 'react'

import {NounPanelLevel} from '../../data/nouns/NounConstants'
import PluralizationSelect from './PluralizationSelect'

function NounEditForm(props) {

    const onChange = () => {}
    const onDelete = () => props.onDeleteNoun(props.editingNoun.id)

    let nounEditForm = <div>Noun Edit Form</div>

    if( props.level.currentAppLevel.nounPanel >= NounPanelLevel.PLURALIZATION) {
        nounEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text' value={props.editingNoun.base}  onChange={onChange}/>
                <PluralizationSelect pluralization_rule={0}/>
                <input type='submit' value={"Save (id = " +props.editingNoun.id+ ")"}/>
                <button onClick={onDelete}>Delete</button>
                <button onClick={props.onCancelNoun}>Cancel</button>
            </div>
    } else if(props.level.currentAppLevel.nounPanel >= NounPanelLevel.BASE) {
        nounEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text' value={props.editingNoun.base}  onChange={onChange}/>
                <input type='submit' value={"Save (id = " +props.editingNoun.id+ ")"}/>
                <button onClick={onDelete}>Delete</button>
                <button onClick={props.onCancelNoun}>Cancel</button>
            </div>
    }

    return (nounEditForm)

}

export default NounEditForm
