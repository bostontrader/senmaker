import React from 'react'

function PluralizationSelect(props) {

    return (
        <div>
            <label htmlFor='pluralization_rule'>Pluralization Rule</label>
            <select  name='pluralization_rule' value={props.pluralization_rule}>
                <option value='0'>No selection</option>
                <option value='1'>Append -s</option>
                <option value='2'>Append -es</option>
            </select>
        </div>
    )

}

export default PluralizationSelect