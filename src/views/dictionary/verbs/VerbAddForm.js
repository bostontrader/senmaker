import React from 'react'

import PastTenseRuleSelect from './PastTenseRuleSelect'
import {VerbPanelLevel} from '../../../data/dictionary/verbs/VerbDictionaryItemConstants'

function VerbAddForm(props) {

    const onInsert = () => props.onInsertVerb({ui:true, verb:{base: props.addEditVerb.getIn(['verb','base'])}})
    const s = props.strings

    let verbAddForm = <div>Verb Add Form</div>
    if(props.level.getIn(['currentAppLevelConfig', 'verbPanel']) >= VerbPanelLevel.PAST_TENSE) {
        verbAddForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text'  />
                <PastTenseRuleSelect pastTense_rule={0}/>
                <input type='submit' value={s.save} onClick={onInsert}/>
                <button onClick={props.onCancelVerb}>{s.cancel}</button>
            </div>
    } else if(props.level.getIn(['currentAppLevelConfig', 'verbPanel']) >= VerbPanelLevel.BASE) {
        verbAddForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.addEditVerb.getIn(['verb','base'])} onChange={(e)=>props.onChangeVerbBase(e.target.value)} />
                <input id='save' type='submit' value={s.save} onClick={onInsert}/>
                <button onClick={props.onCancelVerb}>{s.cancel}</button>
            </div>
    }

    return verbAddForm

}

export default VerbAddForm
