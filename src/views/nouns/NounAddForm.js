import React from 'react'

import {NounPanelLevel} from '../../data/nouns/NounConstants'
import PluralizationSelect from './PluralizationSelect'

function NounAddForm(props) {

    const onInsert = () => props.onInsertNoun({ui:true, noun:{base: props.addEditNoun.getIn(['noun','base'])}})
    const s = props.strings

    let nounAddForm = <div>Noun Add Form</div>
    if(props.level.getIn(['currentAppLevelConfig', 'nounPanel']) >= NounPanelLevel.PLURALIZATION) {
        nounAddForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text'  />
                <PluralizationSelect pluralization_rule={0}/>
                <input type='submit' value={s.save} onClick={onInsert}/>
                <button onClick={props.onCancelNoun}>{s.cancel}</button>
            </div>
    } else if(props.level.getIn(['currentAppLevelConfig', 'nounPanel']) >= NounPanelLevel.BASE) {
        nounAddForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.addEditNoun.getIn(['noun','base'])} onChange={(e)=>props.onChangeBase(e.target.value)} />
                <input id='save' type='submit' value={s.save} onClick={onInsert}/>
                <button onClick={props.onCancelNoun}>{s.cancel}</button>
            </div>
    }

    return nounAddForm
}

export default NounAddForm
