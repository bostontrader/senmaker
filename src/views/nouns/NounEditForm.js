import React from 'react'
import PluralizationSelect from './PluralizationSelect'

function NounForm(props) {

    const onChange = () => {}
    const onDelete = () => props.onDeleteNoun(props.editingNoun.id)

    return (
        <div>
            <label htmlFor='base'>Base</label><input name='base' type='text' value={props.editingNoun.base}  onChange={onChange}/>
            <PluralizationSelect pluralization_rule={props.editingNoun.pluralization_rule}/>
            <br />
            <input type='submit' value={"Save (id = " +props.editingNoun.id+ ")"}/>
            <button onClick={onDelete}>Delete</button>
            <button onClick={props.onCancelNoun}>Cancel</button>
        </div>
    )

}

export default NounForm
