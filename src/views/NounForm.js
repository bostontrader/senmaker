import React from 'react'
import PluralizationSelect from './PluralizationSelect'

function NounForm(props) {

    return (
        <form>
            <label htmlFor='base'>Base</label><input name='base' type='text' value={props.editing.base} />
            <PluralizationSelect pluralization_rule={props.editing.pluralization_rule}/>
            <br />
            <input type='submit' value={props.editing.id?"Save (id = " +props.editing.id+ ")":"Add"}/>
            {props.editing.id?<button >Delete</button>:""}
            {props.editing.id?<button >Cancel</button>:""}
        </form>
    )

}

export default NounForm