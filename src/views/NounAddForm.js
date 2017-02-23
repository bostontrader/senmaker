import React from 'react'
import PluralizationSelect from './PluralizationSelect'

function NounAddForm(props) {

    const onInsert = () => props.onInsert({base: 'frog', pluralization_rule: 2});

    return (
        <div>
            <label htmlFor='base'>Base</label><input name='base' type='text'  />
            <PluralizationSelect pluralization_rule={props.editing.pluralization_rule}/>
            <input type='submit' value="Add" onClick={props.onInsert}/>
        </div>
    )

}

export default NounAddForm

