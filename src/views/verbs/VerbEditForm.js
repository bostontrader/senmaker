import React from 'react'
import TenseSelect from './TenseSelect'

function VerbForm(props) {

    const onChange = () => {}
    const onDelete = () => props.onDeleteVerb(props.editingVerb.id)

    return (
        <div>
            <label htmlFor='base'>Base</label><input name='base' type='text' value={props.editingVerb.base}  onChange={onChange}/>
            <TenseSelect tense_rule={props.editingVerb.tense_rule}/>
            <br />
            <input type='submit' value={"Save (id = " +props.editingVerb.id+ ")"}/>
            <button onClick={onDelete}>Delete</button>
            <button onClick={props.onCancelVerb}>Cancel</button>
        </div>
    )

}

export default VerbForm
