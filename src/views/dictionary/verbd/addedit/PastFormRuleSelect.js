// @flow
import React from 'react'
import {PastFormRule} from '../../../../data/dictionary/verbd/VerbdConstants'

function PastFormRuleSelect(props:Object):Object {

    const onChange:Function = () => {}

    return (
        <div>
            <label htmlFor='pastForm_rule'>Past Form Rule</label>
            <select  name='pastForm_rule' value={props.pastForm_rule} onChange={onChange}>
                <option value={PastFormRule.NoneSelected}>No selection</option>
                <option value={PastFormRule.NoChange}>No change</option>
                <option value={PastFormRule.Append_ed}>Append -ed</option>
                <option value={PastFormRule.Irregular}>Irregular</option>
            </select>
        </div>
    )

}

export default PastFormRuleSelect
