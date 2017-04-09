import React from 'react'

import NoundAEActions from '../../../../data/dictionary/nound/addedit/NoundAEActions'
//import {NoundPanelLevel} from '../../../../data/dictionary/nound/NoundConstants'
//import PluralizationRuleSelect from './PluralizationRuleSelect'

function NoundEditForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const onClickSave = () => NoundAEActions.onClickSaveNound({
        id: props.nound.getIn(['addEditNound','nound','id']),
        base: props.nound.getIn(['addEditNound','nound','base'])
    })
    const onDelete = () => NoundAEActions.onClickDeleteNound(props.nound.getIn(['addEditNound','nound','id']))
    const s = props.strings

    let noundEditForm = null

    //if(props.level.getIn(['currentAppLevelConfig','noundPanel']) >= NoundPanelLevel.PLURALIZATION) {
        /*noundEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.nound.getIn(['addEditNound','noun','base'])} onChange={(e)=>props.nound.getIn(['onChangeNounBase'])(e.target.value)}/>
                <PluralizationRuleSelect pluralization_rule={0}/>
                <input id='save-nound' type='submit' value={s.save}/>
                <button id='delete-nound' onClick={onDelete}>{s.delete}</button>
                <button onClick={props.onCancelNoun}>{s.cancel}</button>
            </div>*/
    //} else if(props.level.getIn(['currentAppLevelConfig','noundPanel']) >= NoundPanelLevel.BASE) {
        noundEditForm =
            <div id="nound-edit-form" style={style}>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text'
                    value={props.nound.getIn(['addEditNound','nound','base'])}
                    onChange={(e)=>NoundAEActions.onChangeBase(e.target.value)}
                />
                <button id='save-nound'   onClick={onClickSave}>{s.save}</button>
                <button id='delete-nound' onClick={onDelete}>{s.delete}</button>
                <button id='cancel'       onClick={NoundAEActions.onClickCancel}>{s.cancel}</button>
            </div>
    //}

    return noundEditForm

}

export default NoundEditForm
