import React from 'react'

import {NoundPanelLevel} from '../../../../data/dictionary/nound/NoundConstants'
import PluralizationRuleSelect from './PluralizationRuleSelect'

function NoundEditForm(props) {

    const onClickSave = () => props.nound.getIn(['onClickSaveNound'])({
        id: props.nound.getIn(['addEditNound','nound','id']),
        base: props.nound.getIn(['addEditNound','nound','base'])
    })
    const onDelete = () => props.nound.getIn(['onClickDeleteNound'])(props.nound.getIn(['addEditNound','nound','id']))
    const s = props.strings

    let noundEditForm = null

    if(props.level.getIn(['currentAppLevelConfig','noundPanel']) >= NoundPanelLevel.PLURALIZATION) {
        noundEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.nound.getIn(['addEditNound','noun','base'])} onChange={(e)=>props.nound.getIn(['onChangeNounBase'])(e.target.value)}/>
                <PluralizationRuleSelect pluralization_rule={0}/>
                <input id='save-nound' type='submit' value={s.save}/>
                <button id='delete-nound' onClick={onDelete}>{s.delete}</button>
                <button onClick={props.onCancelNoun}>{s.cancel}</button>
            </div>
    } else if(props.level.getIn(['currentAppLevelConfig','noundPanel']) >= NoundPanelLevel.BASE) {
        noundEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.nound.getIn(['addEditNound','nound','base'])} onChange={(e)=>props.nound.getIn(['onChangeNoundBase'])(e.target.value)}/>
                <button id='save-nound'   onClick={onClickSave}>{s.save}</button>
                <button id='delete-nound' onClick={onDelete}>{s.delete}</button>
                <button id='cancel'       onClick={props.nound.getIn(['onClickCancel'])}>{s.cancel}</button>
            </div>
    }

    return noundEditForm

}

export default NoundEditForm
