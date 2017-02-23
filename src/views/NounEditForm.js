import React from 'react'
import PluralizationSelect from './PluralizationSelect'

function NounForm(props) {

    const onChange = () => {}
    const onDelete = () => props.onDeleteNoun(props.editing.id)

    return (
        <div>
            <label htmlFor='base'>Base</label><input name='base' type='text' value={props.editing.base}  onChange={onChange}/>
            <PluralizationSelect pluralization_rule={props.editing.pluralization_rule}/>
            <br />
            <input type='submit' value={"Save (id = " +props.editing.id+ ")"}/>
            <button onClick={onDelete}>Delete</button>
            <button onClick={props.onCancel}>Cancel</button>
        </div>
    )

}

export default NounForm
