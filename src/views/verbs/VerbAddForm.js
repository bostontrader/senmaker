import React from 'react'
import TenseSelect from './TenseSelect'

function VerbAddForm(props) {

    const onInsert = () => props.onInsertVerb({base: 'frog', tense_rule: 2});

    return (
        <div>
            <label htmlFor='base'>Base</label><input name='base' type='text'  />
            <TenseSelect tense_rule={props.editingVerb.tense_rule}/>
            <input type='submit' value="Add" onClick={onInsert}/>
            <button onClick={props.onCancelVerb}>Cancel</button>
        </div>
    )

}

export default VerbAddForm

