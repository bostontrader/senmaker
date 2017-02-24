import React from 'react'

function TenseSelect(props) {

    const onChange = () => {}

    return (
        <div>
            <label htmlFor='pluralization_rule'>Tense Rule</label>
            <select  name='pluralization_rule' value={props.pluralization_rule}   onChange={onChange}>
                <option value='0'>No selection</option>
                <option value='1'>Append -s</option>
                <option value='2'>Append -es</option>
            </select>
        </div>
    )

}

export default TenseSelect
