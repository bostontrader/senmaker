import React from 'react'

import {NounPanelLevel} from '../../data/nouns/NounConstants'
import PluralizationSelect from './PluralizationSelect'

function NounAddForm(props) {

    const onInsert = () => props.onInsertNoun({base: 'frog', pluralization_rule: 2});

    let nounAddForm = <div>Noun Add Form</div>
    if(props.level.currentAppLevel.nounPanel >= NounPanelLevel.PLURALIZATION) {
        nounAddForm = <div>
            <label htmlFor='base'>Base</label>
            <input name='base' type='text'  />
            <PluralizationSelect pluralization_rule={0}/>
            <input type='submit' value="Add" onClick={onInsert}/>
            <button onClick={props.onCancelNoun}>Cancel</button>
        </div>
    } else if(props.level.currentAppLevel.nounPanel >= NounPanelLevel.BASE) {
        nounAddForm = <div>
            <label htmlFor='base'>Base</label>
            <input name='base' type='text'  />
            <input type='submit' value="Add" onClick={onInsert}/>
            <button onClick={props.onCancelNoun}>Cancel</button>
        </div>
    }

    return nounAddForm

}

export default NounAddForm
