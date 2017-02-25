import React from 'react'
import VerbConstants from '../../data/verbs/VerbConstants'

function PastTenseRuleSelect(props) {

    const onChange = () => {}

    return (
        <div>
            <label htmlFor='pastTense_rule'>Past Tense Rule</label>
            <select  name='pastTense_rule' value={props.pastTense_rule} onChange={onChange}>
                <option value={VerbConstants.pastTense_NoneSelected}>No selection</option>
                <option value={VerbConstants.pastTense_NoChange}>No change</option>
                <option value={VerbConstants.pastTense_Append_ed}>Append -ed</option>
                <option value={VerbConstants.pastTense_Irregular}>Irregular</option>
            </select>
        </div>
    )

}

export default PastTenseRuleSelect
