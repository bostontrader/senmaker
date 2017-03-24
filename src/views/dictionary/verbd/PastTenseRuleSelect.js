import React from 'react'
import {PastTenseRule} from '../../../data/dictionary/verbd/VerbdConstants'

function PastTenseRuleSelect(props) {

    const onChange = () => {}

    return (
        <div>
            <label htmlFor='pastTense_rule'>Past Tense Rule</label>
            <select  name='pastTense_rule' value={props.pastTense_rule} onChange={onChange}>
                <option value={PastTenseRule.NoneSelected}>No selection</option>
                <option value={PastTenseRule.NoChange}>No change</option>
                <option value={PastTenseRule.Append_ed}>Append -ed</option>
                <option value={PastTenseRule.Irregular}>Irregular</option>
            </select>
        </div>
    )

}

export default PastTenseRuleSelect
