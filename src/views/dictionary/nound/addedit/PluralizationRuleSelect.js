import React from 'react'

/** A Nound has a PluralizationRule which guides the formation of the plural form.
 * This should not be confused with the plurality field of a Nouni which specifies
 * the plurality of a particular instantiated Nouni.
 */
function PluralizationRuleSelect(props) {

    const onChange = () => {}

    return (
        <div>
            <label htmlFor='pluralization_rule'>Pluralization Rule</label>
            <select  name='pluralization_rule' value={props.pluralization_rule} onChange={onChange}>
                <option value='0'>No selection</option>
                <option value='1'>Append -s</option>
                <option value='2'>Append -es</option>
            </select>
        </div>
    )

}

export default PluralizationRuleSelect
