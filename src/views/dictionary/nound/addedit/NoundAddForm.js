import React from 'react'

import {NoundPanelLevel} from '../../../../data/dictionary/nound/NoundConstants'
import PluralizationSelect from '../../../nouni/PluralizationSelect'

function NoundAddForm(props) {

    const onClickSave = () => props.nound.getIn(['onClickSaveNound'])({base: props.nound.getIn(['addEditNound','nound','base'])})
    const s = props.strings

    let noundAddForm = null

    if(props.level.getIn(['currentAppLevelConfig', 'noundPanel']) >= NoundPanelLevel.PLURALIZATION) {
        noundAddForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text'  />
                <PluralizationSelect pluralization_rule={0}/>
                <input type='submit' value={s.save} onClick={onInsert}/>
                <button onClick={props.onCancelNoun}>{s.cancel}</button>
            </div>
    } else if(props.level.getIn(['currentAppLevelConfig', 'noundPanel']) >= NoundPanelLevel.BASE) {
        noundAddForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.nound.getIn(['addEditNound','nound','base'])} onChange={(e)=>props.nound.getIn(['onChangeNoundBase'])(e.target.value)} />
                <button id='save-nound' onClick={onClickSave}>{s.save}</button>
                <button id='cancel'     onClick={props.nound.getIn(['onClickCancel'])}>{s.cancel}</button>
            </div>
    }

    return noundAddForm
}

export default NoundAddForm
