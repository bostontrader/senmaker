import React from 'react'

import {NounPanelLevel} from '../../data/nouns/NounConstants'
import PluralizationSelect from './PluralizationSelect'

function NounAddForm(props) {

    const onInsert = () => props.onInsertNoun({base: props.addEditNoun.getIn(['noun','base'])});

    let nounAddForm = <div>Noun Add Form</div>
    if(props.level.get('currentAppLevelConfig').get('nounPanel') >= NounPanelLevel.PLURALIZATION) {
        nounAddForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text'  />
                <PluralizationSelect pluralization_rule={0}/>
                <input type='submit' value="Add" onClick={onInsert}/>
                <button onClick={props.onCancelNoun}>Cancel</button>
            </div>
    } else if(props.level.get('currentAppLevelConfig').get('nounPanel') >= NounPanelLevel.BASE) {
        nounAddForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text' value={props.addEditNoun.getIn(['noun','base'])} onChange={(e)=>props.onChangeBase(e.target.value)} />
                <input type='submit' value="Save" onClick={onInsert}/>
                <button onClick={props.onCancelNoun}>Cancel</button>
            </div>
    }

    return nounAddForm
}

export default NounAddForm
