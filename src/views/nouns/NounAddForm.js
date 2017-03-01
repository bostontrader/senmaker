import React from 'react'
import PluralizationSelect from './PluralizationSelect'

function NounAddForm(props) {

    const onInsert = () => props.onInsertNoun({base: 'frog', pluralization_rule: 2});

    return (
        <div>
            <label htmlFor='base'>Base</label><input name='base' type='text'  />
            <PluralizationSelect pluralization_rule={props.editingNoun.pluralization_rule}/>
            <input type='submit' value="Add" onClick={onInsert}/>
            <button onClick={props.onCancelNoun}>Cancel</button>
        </div>
    )

}

export default NounAddForm
