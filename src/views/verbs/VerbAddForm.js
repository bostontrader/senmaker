import React from 'react'
import PastTenseRuleSelect from './PastTenseRuleSelect'

function VerbAddForm(props) {

    const onInsert = () => props.onInsertVerb({base: 'talk', pastTense_rule: 2});

    return (
        <div>
            <label htmlFor='base'>Base</label><input name='base' type='text'  />
            <PastTenseRuleSelect pastTense_rule={props.editingVerb.pastTense_rule}/>
            <input type='submit' value="Add" onClick={onInsert}/>
            <button onClick={props.onCancelVerb}>Cancel</button>
        </div>
    )

}

export default VerbAddForm
