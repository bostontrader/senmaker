import React from 'react'

import PastTenseRuleSelect from './PastTenseRuleSelect'
import {VerbPanelLevel} from '../../data/verbs/VerbConstants'

function VerbAddForm(props) {

    const onInsert = () => props.onInsertVerb({base: 'talk', pastTense_rule: 2});

    let verbAddForm = <div>Verb Add Form</div>
    if(props.level.get('currentAppLevelConfig').get('editPanel') >= VerbPanelLevel.PAST_TENSE) {
        verbAddForm = <div>
            <label htmlFor='base'>Base</label>
            <input name='base' type='text'  />
            <PastTenseRuleSelect pastTense_rule={0}/>
            <input type='submit' value="Add" onClick={onInsert}/>
            <button onClick={props.onCancelVerb}>Cancel</button>
        </div>
    } else if(props.level.get('currentAppLevelConfig').get('editPanel') >= VerbPanelLevel.BASE) {
        verbAddForm = <div>
            <label htmlFor='base'>Base</label>
            <input name='base' type='text'  />
            <input type='submit' value="Add" onClick={onInsert}/>
            <button onClick={props.onCancelVerb}>Cancel</button>
        </div>
    }

    return verbAddForm

}

export default VerbAddForm
